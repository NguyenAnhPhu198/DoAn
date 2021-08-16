export default [
  {
    _name: "CSidebarNavTitle",
    _children: ["Theme"],
    visible_on: 'development',
  },
  {
    _name: "CSidebarNavItem",
    name: "Colors",
    to: "/theme/colors",
    icon: "cil-drop",
    visible_on: 'development',
  },
  {
    _name: "CSidebarNavItem",
    name: "Typography",
    to: "/theme/typography",
    icon: "cil-pencil",
    visible_on: 'development',
  },
  {
    _name: "CSidebarNavTitle",
    _children: ["Components"],
    visible_on: 'development',
  },
  {
    _name: "CSidebarNavDropdown",
    name: "Base",
    route: "/base",
    icon: "cil-puzzle",
    visible_on: 'development',
    items: [
      {
        name: "Breadcrumbs",
        to: "/base/breadcrumbs",
      },
      {
        name: "Cards",
        to: "/base/cards",
      },
      {
        name: "Carousels",
        to: "/base/carousels",
      },
      {
        name: "Collapses",
        to: "/base/collapses",
      },
      {
        name: "Jumbotrons",
        to: "/base/jumbotrons",
      },
      {
        name: "List Groups",
        to: "/base/list-groups",
      },
      {
        name: "Navs",
        to: "/base/navs",
      },
      {
        name: "Navbars",
        to: "/base/navbars",
      },
      {
        name: "Paginations",
        to: "/base/paginations",
      },
      {
        name: "Popovers",
        to: "/base/popovers",
      },
      {
        name: "Progress Bars",
        to: "/base/progress-bars",
      },
      {
        name: "Switches",
        to: "/base/switches",
      },
      {
        name: "Tabs",
        to: "/base/tabs",
      },
      {
        name: "Tooltips",
        to: "/base/tooltips",
      },
    ],
  },
  {
    _name: "CSidebarNavDropdown",
    name: "Buttons",
    route: "/buttons",
    icon: "cil-cursor",
    visible_on: 'development',
    items: [
      {
        name: "Buttons",
        to: "/buttons/standard-buttons",
      },
      {
        name: "Button Dropdowns",
        to: "/buttons/dropdowns",
      },
      {
        name: "Button Groups",
        to: "/buttons/button-groups",
      },
      {
        name: "Brand Buttons",
        to: "/buttons/brand-buttons",
      },
      {
        name: "Loading Buttons",
        to: "/buttons/loading-buttons",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
    ],
  },
  {
    _name: "CSidebarNavItem",
    name: "Charts",
    to: "/charts",
    icon: "cil-chart-pie",
    visible_on: 'development',
  },
  {
    _name: "CSidebarNavDropdown",
    name: "Editors",
    route: "/editors",
    icon: "cil-code",
    visible_on: 'development',
    items: [
      {
        name: "Code editors",
        to: "/editors/code-editors",
        icon: "cil-code",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
      {
        name: "Text editors",
        to: "/editors/text-editors",
        icon: "cil-justify-left",
      },
    ],
  },
  {
    _name: "CSidebarNavDropdown",
    name: "Forms",
    route: "/forms",
    icon: "cil-notes",
    visible_on: 'development',
    items: [
      {
        name: "Basic forms",
        to: "/forms/basic-forms",
      },
      {
        name: "Advanced forms",
        to: "/forms/advanced-forms",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
      {
        name: "Validation forms",
        to: "/forms/validation-forms",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
      {
        name: "Multiselect",
        to: "/forms/multi-select",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
    ],
  },
  {
    _name: "CSidebarNavItem",
    name: "Google Maps",
    to: "/google-maps",
    icon: "cil-map",
    badge: {
      color: "danger",
      text: "PRO",
    },
    visible_on: 'development',
  },
  {
    _name: "CSidebarNavDropdown",
    name: "Icons",
    route: "/icons",
    icon: "cil-star",
    visible_on: 'development',
    items: [
      {
        name: "CoreUI Icons",
        to: "/icons/coreui-icons",
        badge: {
          color: "info",
          text: "NEW",
        },
      },
      {
        name: "Brands",
        to: "/icons/brands",
      },
      {
        name: "Flags",
        to: "/icons/flags",
      },
    ],
  },
  {
    _name: "CSidebarNavDropdown",
    name: "Notifications",
    route: "/notifications",
    icon: "cil-bell",
    visible_on: 'development',
    items: [
      {
        name: "Alerts",
        to: "/notifications/alerts",
      },
      {
        name: "Badges",
        to: "/notifications/badges",
      },
      {
        name: "Modals",
        to: "/notifications/modals",
      },
      {
        name: "Toaster",
        to: "/notifications/toaster",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
    ],
  },
  {
    _name: "CSidebarNavDropdown",
    name: "Plugins",
    route: "/plugins",
    icon: "cil-input-power",
    visible_on: 'development',
    items: [
      {
        name: "Draggable",
        to: "/plugins/draggable",
        icon: "cil-cursor-move",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
      {
        name: "Calendar",
        to: "/plugins/calendar",
        icon: "cil-calendar",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
      {
        name: "Spinners",
        to: "/plugins/spinners",
        icon: "cil-circle",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
    ],
  },
  {
    _name: "CSidebarNavDropdown",
    name: "Tables",
    route: "/tables",
    icon: "cil-list",
    visible_on: 'development',
    items: [
      {
        name: "Basic Tables",
        to: "/tables/tables",
        icon: "cil-list",
      },
      {
        name: "Advanced tables",
        to: "/tables/advanced-tables",
        icon: "cil-list-rich",
      },
    ],
  },
  {
    _name: "CSidebarNavItem",
    name: "Widgets",
    to: "/widgets",
    icon: "cil-calculator",
    badge: {
      color: "primary",
      text: "NEW",
      shape: "pill",
    },
    visible_on: 'development',
  },
  {
    _name: "CSidebarNavDivider",
    visible_on: 'development',
  },
  {
    _name: "CSidebarNavTitle",
    _children: ["Extras"],
    visible_on: 'development',
  },
  {
    _name: "CSidebarNavDropdown",
    name: "Pages",
    route: "/pages",
    icon: "cil-star",
    visible_on: 'development',
    items: [
      {
        name: "Login",
        to: "/pages/login",
      },
      {
        name: "Register",
        to: "/pages/register",
      },
      {
        name: "Error 404",
        to: "/pages/404",
      },
      {
        name: "Error 500",
        to: "/pages/500",
      },
    ],
  },
  {
    _name: "CSidebarNavDropdown",
    name: "Apps",
    route: "/apps",
    icon: "cil-layers",
    visible_on: 'development',
    _children: [
      {
        _name: "CSidebarNavDropdown",
        name: "Invoicing",
        route: "/apps/invoicing",
        icon: "cil-spreadsheet",
        items: [
          {
            name: "Invoice",
            to: "/apps/invoicing/invoice",
            badge: {
              color: "danger",
              text: "PRO",
            },
          },
        ],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "Email",
        route: "/apps/email",
        icon: "cil-envelope-closed",
        items: [
          {
            name: "Inbox",
            to: "/apps/email/inbox",
            icon: "cil-envelope-closed",
            badge: {
              color: "danger",
              text: "PRO",
            },
          },
          {
            name: "Message",
            to: "/apps/email/message",
            icon: "cil-envelope-open",
            badge: {
              color: "danger",
              text: "PRO",
            },
          },
          {
            name: "Compose",
            to: "/apps/email/compose",
            icon: "cil-envelope-letter",
            badge: {
              color: "danger",
              text: "PRO",
            },
          },
        ],
      },
    ],
  },
  {
    _name: "CSidebarNavDivider",
    _class: "m-2",
    visible_on: 'development',
  },
  {
    _name: "CSidebarNavTitle",
    _children: ["Labels"],
    visible_on: 'development',
  },
  {
    _name: "CSidebarNavItem",
    name: "Label danger",
    icon: {
      name: "cil-star",
      class: "text-danger",
    },
    label: true,
    visible_on: 'development',
  },
  {
    _name: "CSidebarNavItem",
    name: "Label info",
    icon: {
      name: "cil-star",
      class: "text-info",
    },
    label: true,
    visible_on: 'development',
  },
  {
    _name: "CSidebarNavItem",
    name: "Label warning",
    icon: {
      name: "cil-star",
      class: "text-warning",
    },
    label: true,
    visible_on: 'development',
  },
]