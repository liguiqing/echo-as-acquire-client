import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);
import Router from 'vue-router';
const Home = () => import('../core/home/home.vue');
const Error = () => import('../core/error/error.vue');
const EchoConfigurationComponent = () => import('../admin/configuration/configuration.vue');
const EchoDocsComponent = () => import('../admin/docs/docs.vue');
const EchoHealthComponent = () => import('../admin/health/health.vue');
const EchoLogsComponent = () => import('../admin/logs/logs.vue');
const EchoAuditsComponent = () => import('../admin/audits/audits.vue');
const EchoMetricsComponent = () => import('../admin/metrics/metrics.vue');
/* tslint:disable */
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here
const ScanClient = () => import('../scan/scan.client.vue');
Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/scan',
      name: 'ScanClient',
      component: ScanClient
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/admin/docs',
      name: 'EchoDocsComponent',
      component: EchoDocsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/audits',
      name: 'EchoAuditsComponent',
      component: EchoAuditsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/echo-health',
      name: 'EchoHealthComponent',
      component: EchoHealthComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/logs',
      name: 'EchoLogsComponent',
      component: EchoLogsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/echo-metrics',
      name: 'EchoMetricsComponent',
      component: EchoMetricsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/echo-configuration',
      name: 'EchoConfigurationComponent',
      component: EchoConfigurationComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    }
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ]
});
