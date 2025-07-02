import { Client } from '@elastic/elasticsearch';
const es = new Client({ node: process.env.ES_URL });

export async function searchMenu(q) {
  const resp = await es.search({
    index: 'menu-items-*',
    body: {
      query: {
        multi_match: {
          query: q,
          fields: ['name^3','description'],
          fuzziness: 'AUTO'
        }
      },
      highlight: { fields: { name: {} } }
    }
  });
  return resp.hits.hits;
}
