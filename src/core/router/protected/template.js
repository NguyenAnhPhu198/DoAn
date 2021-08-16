// Views
const Dashboard = () => import('@/core/views/Dashboard')

const Colors = () => import('@/core/views/theme/Colors')
const Typography = () => import('@/core/views/theme/Typography')

const Charts = () => import('@/core/views/charts/Charts')
const Widgets = () => import('@/core/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/core/views/base/Cards')
const Switches = () => import('@/core/views/base/Switches')
const Tabs = () => import('@/core/views/base/Tabs')
const Breadcrumbs = () => import('@/core/views/base/Breadcrumbs')
const Carousels = () => import('@/core/views/base/Carousels')
const Collapses = () => import('@/core/views/base/Collapses')
const Jumbotrons = () => import('@/core/views/base/Jumbotrons')
const ListGroups = () => import('@/core/views/base/ListGroups')
const Navs = () => import('@/core/views/base/Navs')
const Navbars = () => import('@/core/views/base/Navbars')
const Paginations = () => import('@/core/views/base/Paginations')
const Popovers = () => import('@/core/views/base/Popovers')
const ProgressBars = () => import('@/core/views/base/ProgressBars')
const Tables = () => import('@/core/views/tables/Tables')
const AdvancedTables = () => import('@/core/views/tables/AdvancedTables')
const Tooltips = () => import('@/core/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/core/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/core/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/core/views/buttons/Dropdowns')
const BrandButtons = () => import('@/core/views/buttons/BrandButtons')
const LoadingButtons = () => import('@/core/views/buttons/LoadingButtons')

// Views - Editors
const TextEditors = () => import('@/core/views/editors/TextEditors')
const CodeEditors = () => import('@/core/views/editors/CodeEditors')

// Views - Forms
const BasicForms = () => import('@/core/views/forms/Forms')
const AdvancedForms = () => import('@/core/views/forms/AdvancedForms')
const ValidationForms = () => import('@/core/views/forms/ValidationForms')
const MultiSelect = () => import('@/core/views/forms/MultiSelect')

// Views GoogleMaps
const GoogleMaps = () => import('@/core/views/GoogleMaps')

// Views - Icons
const CoreUIIcons = () => import('@/core/views/icons/CoreUIIcons')
const Brands = () => import('@/core/views/icons/Brands')
const Flags = () => import('@/core/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/core/views/notifications/Alerts')
const Badges = () => import('@/core/views/notifications/Badges')
const Modals = () => import('@/core/views/notifications/Modals')
const Toaster = () => import('@/core/views/notifications/Toaster')

// Users
const Users = () => import('@/core/views/users/Users')
const User = () => import('@/core/views/users/User')

// Plugins
const Draggable = () => import('@/core/views/plugins/Draggable')
const Calendar = () => import('@/core/views/plugins/Calendar')
const Spinners = () => import('@/core/views/plugins/Spinners')

// Apps -> Invoice
const Invoice = () => import('@/core/views/apps/invoicing/Invoice')

// Apps -> Email
const EmailApp = () => import('@/core/views/apps/email/EmailApp')
const Compose = () => import('@/core/views/apps/email/Compose')
const Inbox = () => import('@/core/views/apps/email/Inbox')
const Message = () => import('@/core/views/apps/email/Message')

export default [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: 'theme',
    redirect: '/theme/colors',
    name: 'Theme',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: 'colors',
        name: 'Colors',
        component: Colors
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      }
    ]
  },
  {
    path: 'charts',
    name: 'Charts',
    component: Charts
  },
  {
    path: 'tables',
    redirect: '/tables/tables',
    name: 'Tables',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: 'tables',
        name: 'Basic tables',
        component: Tables
      },
      {
        path: 'advanced-tables',
        name: 'Advanced tables',
        component: AdvancedTables
      }
    ]
  },
  {
    path: 'widgets',
    name: 'Widgets',
    component: Widgets
  },
  {
    path: 'base',
    redirect: '/base/cards',
    name: 'Base',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: 'breadcrumbs',
        name: 'Breadcrumbs',
        component: Breadcrumbs
      },
      {
        path: 'cards',
        name: 'Cards',
        component: Cards
      },
      {
        path: 'carousels',
        name: 'Carousels',
        component: Carousels
      },
      {
        path: 'collapses',
        name: 'Collapses',
        component: Collapses
      },
      {
        path: 'jumbotrons',
        name: 'Jumbotrons',
        component: Jumbotrons
      },
      {
        path: 'list-groups',
        name: 'List Groups',
        component: ListGroups
      },
      {
        path: 'navs',
        name: 'Navs',
        component: Navs
      },
      {
        path: 'navbars',
        name: 'Navbars',
        component: Navbars
      },
      {
        path: 'paginations',
        name: 'Paginations',
        component: Paginations
      },
      {
        path: 'popovers',
        name: 'Popovers',
        component: Popovers
      },
      {
        path: 'progress-bars',
        name: 'Progress Bars',
        component: ProgressBars
      },
      {
        path: 'switches',
        name: 'Switches',
        component: Switches
      },
      {
        path: 'tabs',
        name: 'Tabs',
        component: Tabs
      },
      {
        path: 'tooltips',
        name: 'Tooltips',
        component: Tooltips
      }
    ]
  },
  {
    path: 'buttons',
    redirect: '/buttons/standard-buttons',
    name: 'Buttons',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: 'standard-buttons',
        name: 'Standard Buttons',
        component: StandardButtons
      },
      {
        path: 'button-groups',
        name: 'Button Groups',
        component: ButtonGroups
      },
      {
        path: 'dropdowns',
        name: 'Dropdowns',
        component: Dropdowns
      },
      {
        path: 'brand-buttons',
        name: 'Brand Buttons',
        component: BrandButtons
      },
      {
        path: 'loading-buttons',
        name: 'Loading Buttons',
        component: LoadingButtons
      }
    ]
  },
  {
    path: 'editors',
    redirect: '/editors/text-editors',
    name: 'Editors',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: 'text-editors',
        name: 'Text Editors',
        component: TextEditors
      },
      {
        path: 'code-editors',
        name: 'Code Editors',
        component: CodeEditors
      }
    ]
  },
  {
    path: 'forms',
    redirect: '/forms/basic-forms',
    name: 'Forms',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: 'basic-forms',
        name: 'Basic Forms',
        component: BasicForms
      },
      {
        path: 'advanced-forms',
        name: 'Advanced Forms',
        component: AdvancedForms
      },
      {
        path: 'validation-forms',
        name: 'Form Validation',
        component: ValidationForms
      },
      {
        path: 'multi-select',
        name: 'Multiselect',
        component: MultiSelect
      },
    ]
  },
  {
    path: 'google-maps',
    name: 'Google Maps',
    component: GoogleMaps
  },
  {
    path: 'icons',
    redirect: '/icons/font-awesome',
    name: 'Icons',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: 'coreui-icons',
        name: 'CoreUI Icons',
        component: CoreUIIcons
      },
      {
        path: 'flags',
        name: 'Flags',
        component: Flags
      },
      {
        path: 'brands',
        name: 'Brands',
        component: Brands
      }
    ]
  },
  {
    path: 'notifications',
    redirect: '/notifications/alerts',
    name: 'Notifications',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: 'alerts',
        name: 'Alerts',
        component: Alerts
      },
      {
        path: 'badges',
        name: 'Badges',
        component: Badges
      },
      {
        path: 'modals',
        name: 'Modals',
        component: Modals
      },
      {
        path: 'toaster',
        name: 'Toaster',
        component: Toaster
      }
    ]
  },
  {
    path: 'plugins',
    redirect: '/plugins/draggable',
    name: 'Plugins',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: 'draggable',
        name: 'Draggable Cards',
        component: Draggable
      },
      {
        path: 'calendar',
        name: 'Calendar',
        component: Calendar
      },
      {
        path: 'spinners',
        name: 'Spinners',
        component: Spinners
      }
    ]
  },
  {
    path: 'apps',
    name: 'Apps',
    redirect: '/apps/invoicing/invoice',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: 'invoicing',
        redirect: '/apps/invoicing/invoice',
        name: 'Invoicing',
        component: {
          render(c) { return c('router-view') }
        },
        children: [
          {
            path: 'invoice',
            name: 'Invoice',
            component: Invoice
          }
        ]
      }
    ]
  },
  {
    path: '/apps/email',
    redirect: '/apps/email/inbox',
    name: 'Email',
    component: EmailApp,
    children: [
      {
        path: 'compose',
        name: 'Compose',
        component: Compose
      },
      {
        path: 'inbox',
        name: 'Inbox',
        component: Inbox
      },
      {
        path: 'message',
        name: 'Message',
        component: Message
      }
    ]
  },
]