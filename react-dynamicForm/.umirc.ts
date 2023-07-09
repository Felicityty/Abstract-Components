import { defineConfig } from "umi";

const routesPath = [
  'home',
  'docs',
  'dynamicForm'
]

export default defineConfig({
  routes: routesPath.map((e)=>({path:`/${e}`,component:e})),
  npmClient: 'yarn',
});
