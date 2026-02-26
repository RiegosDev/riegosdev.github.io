// import { discoverNewCategoriesAction } from '../actions/discovery.actions';
import { refreshExistingContentAction } from '../actions/maintenance.actions';

async function run() {
  console.log(
    '🔥 [HARDCORE] Iniciando Seed Manual...',
  );

  // Opção 1: Discovery Total
  // await discoverNewCategoriesAction();

  // Opção 2: Refresh de Conteúdo (Ex: 20 categorias de uma vez)
  await refreshExistingContentAction(
    20,
  );

  console.log(
    '✅ [HARDCORE] Finalizado!',
  );
}

run().catch(console.error);
