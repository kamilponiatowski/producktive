// Script to apply schema changes - step by step with retries
const BASE = 'http://localhost:8055';

async function getToken() {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'poniatowski.dev@gmail.com', password: 'K@milmabazedanych69' })
  });
  const { data } = await res.json();
  return data.access_token;
}

async function api(token, method, path, body = null) {
  const opts = {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  };
  if (body) opts.body = JSON.stringify(body);
  
  try {
    const res = await fetch(`${BASE}${path}`, opts);
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }
    if (!res.ok) {
      const msg = data?.errors?.[0]?.message || JSON.stringify(data);
      console.log(`  ❌ ${method} ${path} → ${res.status}: ${msg}`);
      return { error: true, status: res.status, msg };
    }
    return data;
  } catch (e) {
    console.log(`  ❌ ${method} ${path} → Connection error: ${e.message}`);
    return { error: true, msg: e.message };
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const token = await getToken();
  console.log('🔑 Zalogowano do Directus\n');

  // ═══════════════════════════════════════════════════════════
  // KROK 1: Dodaj "children" O2M alias do knowledge_categories
  // ═══════════════════════════════════════════════════════════
  console.log('📦 KROK 1: Dodaję pole "children" (O2M alias) do knowledge_categories...');
  
  // Create the O2M alias field first
  let r = await api(token, 'POST', '/fields/knowledge_categories', {
    field: 'children',
    type: 'alias',
    meta: {
      special: ['o2m'],
      interface: 'list-o2m',
      display: 'related-values',
      display_options: { template: '{{slug}}' },
      readonly: false,
      hidden: false
    }
  });
  if (r?.error && r.msg?.includes('already exists')) {
    console.log('  ⏭️  Pole "children" już istnieje');
  } else if (!r?.error) {
    console.log('  ✅ Pole alias "children" utworzone');
  }
  
  await sleep(500);

  // Update the existing parent relation to point back via children
  r = await api(token, 'PATCH', '/relations/knowledge_categories/parent', {
    meta: {
      one_field: 'children',
      one_deselect_action: 'nullify'
    }
  });
  if (!r?.error) console.log('  ✅ Relacja parent ↔ children powiązana');
  
  await sleep(500);

  // ═══════════════════════════════════════════════════════════
  // KROK 2: Dodaj "description" do knowledge_categories_translations
  // ═══════════════════════════════════════════════════════════
  console.log('\n📦 KROK 2: Dodaję pole "description" do knowledge_categories_translations...');
  r = await api(token, 'POST', '/fields/knowledge_categories_translations', {
    field: 'description',
    type: 'text',
    schema: { is_nullable: true },
    meta: {
      interface: 'input-multiline',
      display: 'formatted-value',
      note: 'Opis kategorii (opcjonalny)'
    }
  });
  if (r?.error && r.msg?.includes('already exists')) {
    console.log('  ⏭️  Pole "description" już istnieje');
  } else if (!r?.error) {
    console.log('  ✅ Pole "description" dodane');
  }
  
  await sleep(500);

  // ═══════════════════════════════════════════════════════════
  // KROK 3: Zmień "tags" na JSON
  // ═══════════════════════════════════════════════════════════
  console.log('\n📦 KROK 3: Zmieniam pole "tags" na JSON z interfejsem Tags...');
  r = await api(token, 'PATCH', '/fields/knowledge_posts/tags', {
    type: 'json',
    schema: { data_type: 'json', is_nullable: true },
    meta: {
      interface: 'tags',
      display: 'labels',
      note: 'Tagi posta, np. pinia, vue, state-management'
    }
  });
  if (!r?.error) console.log('  ✅ Pole "tags" zmienione na JSON');
  
  await sleep(500);

  // ═══════════════════════════════════════════════════════════
  // KROK 4: Dodaj "posts" O2M alias do knowledge_series
  // ═══════════════════════════════════════════════════════════
  console.log('\n📦 KROK 4: Dodaję pole "posts" (O2M alias) do knowledge_series...');
  
  r = await api(token, 'POST', '/fields/knowledge_series', {
    field: 'posts',
    type: 'alias',
    meta: {
      special: ['o2m'],
      interface: 'list-o2m',
      display: 'related-values',
      display_options: { template: '{{slug}}' },
      readonly: false,
      hidden: false
    }
  });
  if (r?.error && r.msg?.includes('already exists')) {
    console.log('  ⏭️  Pole "posts" już istnieje');
  } else if (!r?.error) {
    console.log('  ✅ Pole alias "posts" utworzone');
  }
  
  await sleep(500);

  r = await api(token, 'PATCH', '/relations/knowledge_posts/series', {
    meta: {
      one_field: 'posts',
      one_deselect_action: 'nullify'
    }
  });
  if (!r?.error) console.log('  ✅ Relacja series ↔ posts powiązana');
  
  await sleep(500);

  // ═══════════════════════════════════════════════════════════
  // KROK 5: Dodaj "series" O2M alias do knowledge_categories
  // ═══════════════════════════════════════════════════════════
  console.log('\n📦 KROK 5: Dodaję pole "series" (O2M alias) do knowledge_categories...');
  
  r = await api(token, 'POST', '/fields/knowledge_categories', {
    field: 'series',
    type: 'alias',
    meta: {
      special: ['o2m'],
      interface: 'list-o2m',
      display: 'related-values',
      display_options: { template: '{{slug}}' },
      readonly: false,
      hidden: false
    }
  });
  if (r?.error && r.msg?.includes('already exists')) {
    console.log('  ⏭️  Pole "series" już istnieje');
  } else if (!r?.error) {
    console.log('  ✅ Pole alias "series" utworzone');
  }
  
  await sleep(500);

  r = await api(token, 'PATCH', '/relations/knowledge_series/category', {
    meta: {
      one_field: 'series',
      one_deselect_action: 'nullify'
    }
  });
  if (!r?.error) console.log('  ✅ Relacja category ↔ series powiązana');
  
  await sleep(500);

  // ═══════════════════════════════════════════════════════════
  // KROK 6: Dodaj cover_image do knowledge_series
  // ═══════════════════════════════════════════════════════════
  console.log('\n📦 KROK 6: Dodaję pole "cover_image" (File) do knowledge_series...');
  
  r = await api(token, 'POST', '/fields/knowledge_series', {
    field: 'cover_image',
    type: 'uuid',
    schema: { is_nullable: true },
    meta: {
      interface: 'file-image',
      display: 'image',
      special: ['file'],
      note: 'Grafika okładkowa serii (opcjonalna)'
    }
  });
  if (r?.error && r.msg?.includes('already exists')) {
    console.log('  ⏭️  Pole "cover_image" już istnieje');
  } else if (!r?.error) {
    console.log('  ✅ Pole "cover_image" utworzone');
  }
  
  await sleep(500);

  // Create the relation to directus_files
  r = await api(token, 'POST', '/relations', {
    collection: 'knowledge_series',
    field: 'cover_image',
    related_collection: 'directus_files',
    meta: { sort_field: null },
    schema: { on_delete: 'SET NULL' }
  });
  if (r?.error && r.msg?.includes('already exists')) {
    console.log('  ⏭️  Relacja cover_image już istnieje');
  } else if (!r?.error) {
    console.log('  ✅ Relacja cover_image → directus_files utworzona');
  }
  
  await sleep(500);

  // ═══════════════════════════════════════════════════════════
  // KROK 7: Uprawnienia Public Read
  // ═══════════════════════════════════════════════════════════
  console.log('\n📦 KROK 7: Ustawiam uprawnienia Public Read...');
  
  const policiesRes = await api(token, 'GET', '/policies');
  const policies = policiesRes?.data || [];
  
  // Find public policy - try different approaches
  let publicPolicy = policies.find(p => p.name === 'Public');
  if (!publicPolicy) {
    // In newer Directus, public might be identified differently
    const rolesRes = await api(token, 'GET', '/roles');
    const roles = rolesRes?.data || [];
    const publicRole = roles.find(r => r.name === 'Public' || r.public === true);
    if (publicRole) {
      publicPolicy = policies.find(p => p.role === publicRole.id);
    }
  }
  
  if (!publicPolicy) {
    // Try to get the public policy through permissions endpoint
    console.log('  ℹ️ Szukam polityki Public...');
    console.log('  Dostępne polityki:', policies.map(p => `${p.name} (${p.id})`).join(', '));
  }
  
  if (publicPolicy) {
    console.log(`  ℹ️ Znaleziono politykę: ${publicPolicy.name} (${publicPolicy.id})`);
    
    const permsRes = await api(token, 'GET', '/permissions');
    const existingPerms = permsRes?.data || [];
    
    const collections = [
      { col: 'knowledge_categories', filter: null },
      { col: 'knowledge_categories_translations', filter: null },
      { col: 'knowledge_series', filter: { status: { _eq: 'published' } } },
      { col: 'knowledge_series_translations', filter: null },
      { col: 'knowledge_posts', filter: { status: { _eq: 'published' } } },
      { col: 'knowledge_posts_translations', filter: null },
      { col: 'languages', filter: null },
      { col: 'directus_files', filter: null }
    ];

    for (const { col, filter } of collections) {
      const exists = existingPerms.find(p => 
        p.collection === col && p.action === 'read' && p.policy === publicPolicy.id
      );
      if (exists) {
        console.log(`  ⏭️  ${col} — Read już istnieje`);
        continue;
      }
      
      const body = {
        collection: col,
        action: 'read',
        policy: publicPolicy.id,
        fields: ['*'],
        permissions: filter || {},
        validation: {}
      };
      
      r = await api(token, 'POST', '/permissions', body);
      if (!r?.error) {
        console.log(`  ✅ ${col} — Read dodane${filter ? ' (filtr: published)' : ''}`);
      }
      await sleep(200);
    }
  } else {
    console.log('  ⚠️ Nie znaleziono polityki Public! Ustaw ręcznie w panelu.');
    console.log('     Settings → Access Policies → Public → dodaj Read dla kolekcji knowledge_*');
  }

  console.log('\n🎉 Gotowe! Uruchom "node check-schema.mjs" by zweryfikować zmiany.');
}

main().catch(console.error);
