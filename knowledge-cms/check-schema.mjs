// Quick script to check current Directus schema
const BASE = 'http://localhost:8055';

async function main() {
  // Login
  const loginRes = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'poniatowski.dev@gmail.com', password: 'K@milmabazedanych69' })
  });
  const { data: { access_token } } = await loginRes.json();

  // Get all fields
  const fieldsRes = await fetch(`${BASE}/fields`, {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  const { data: fields } = await fieldsRes.json();

  // Get relations
  const relRes = await fetch(`${BASE}/relations`, {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  const { data: relations } = await relRes.json();

  // Filter knowledge_* and languages collections
  const knowledgeFields = fields.filter(f => 
    f.collection.startsWith('knowledge_') || f.collection === 'languages'
  );

  // Group by collection
  const grouped = {};
  for (const f of knowledgeFields) {
    if (!grouped[f.collection]) grouped[f.collection] = [];
    grouped[f.collection].push({
      field: f.field,
      type: f.type,
      schema_type: f.schema?.data_type || '',
      is_nullable: f.schema?.is_nullable,
      is_required: f.meta?.required || false,
      interface: f.meta?.interface || '',
      special: f.meta?.special || []
    });
  }

  console.log('\n=== COLLECTIONS & FIELDS ===\n');
  for (const [col, colFields] of Object.entries(grouped).sort()) {
    console.log(`\n📦 ${col}`);
    console.log('-'.repeat(50));
    for (const f of colFields) {
      const specials = f.special.length ? ` [${f.special.join(', ')}]` : '';
      const req = f.is_required ? ' *REQUIRED*' : '';
      console.log(`  ${f.field}: ${f.type || f.schema_type} (interface: ${f.interface})${specials}${req}`);
    }
  }

  console.log('\n\n=== RELATIONS ===\n');
  const knowledgeRelations = relations.filter(r => 
    r.collection?.startsWith('knowledge_') || r.related_collection?.startsWith('knowledge_')
  );
  for (const r of knowledgeRelations) {
    console.log(`${r.collection}.${r.field} → ${r.related_collection} (${r.meta?.one_field || 'no backref'})`);
  }
}

main().catch(console.error);
