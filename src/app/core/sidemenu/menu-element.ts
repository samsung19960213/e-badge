export const menus = [
    {
        'name': 'Dashboard',
        'icon': 'dashboard',
        'link': '/auth/dashboard',
        'open': false,
        'chip': { 'value': 1, 'color': 'accent' },
       
    },
    {
        'name': 'Office',
        'icon': 'dashboard',
        'link': '/auth/office',
        'open': false,
        
       
    },
    {
        'name': 'Employees',
        'icon': 'people',
        'link': false,
        'open': false,
        
        'sub': [
            {
                'name': 'Add Employees',
                'link': 'employees/add-employees',
                'icon': 'person_add',
                'chip': false,
                'open': false,
            },
       
            {
                'name': 'Employee List',
                'link': 'employees/employee-table',
                'icon': 'people',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Active Employees',
                'link': 'employees/active-employees',
                'icon': 'people',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Inactive Employees',
                'link': 'employees/deactivated-employees',
                'icon': 'people_outline',
                'chip': false,
                'open': false,
            }


        ]
    },
    {
        'name': 'Attendance',
        'icon': 'account_box',
        'link': false,
        'open': false,
        
        'sub': [
            {
                'name': 'Absentees List',
                'link': 'attendance/absentees',
                'icon': 'account_circle',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Present List',
                'link': 'attendance/present',
                'icon': 'account_circle',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Late Comers List',
                'link': 'attendance/late-comers',
                'icon': 'account_circle',
                'chip': false,
                'open': false,
            },
           
           

        ]
    },
   
    {
        'name': 'Leave',
        'icon': 'inbox',
        'link': false,
        'open': false,
        
        'sub': [
            {
                'name': 'Leave Requests',
                'link': 'leaves/leave-list',
                'icon': 'drafts',
                'chip': false,
                'open': false,
            },     
            {
                'name': 'Pending Leaves',
                'link': 'leaves/pending-leaves',
                'icon': 'mail',
                'chip': false,
                'open': false,
            },         
        ]
    },

    {
        'name': 'Material Widget',
        'icon': 'widgets',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Buttons',
                'link': 'material-widgets/buttons',
                'icon': 'indeterminate_check_box',
                'chip': false,
                'open': false,
            },
            {
                'name': 'List',
                'link': 'material-widgets/list',
                'icon': 'list',
                'chip': false,
                'open': false,
            },
            {

                'name': 'Stepper',
                'link': 'material-widgets/stepper',
                'icon': 'view_week',
                'chip': false,
                'open': false,

            },
            {
                'name': 'Expansion',
                'link': 'material-widgets/expansion',
                'icon': 'web_aaset',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Progress Spinner',
                'link': 'material-widgets/spinner',
                'icon': 'cached',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Cards',
                'link': 'material-widgets/cards',
                'icon': 'crop_16_9',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Icons',
                'link': 'material-widgets/icons',
                'icon': 'gif',
                'chip': false,
                'open': false,
            },
            {

                'name': 'AutoComplete',
                'link': 'material-widgets/autocomplete',
                'icon': 'get_app',
                'chip': false,
                'open': false,
            },
            {
                'name': 'CheckBox',
                'link': 'material-widgets/checkbox',
                'icon': 'check_box',
                'chip': false,
                'open': false,
            },
            {
                'name': 'DatePicker',
                'link': 'material-widgets/datepicker',
                'icon': 'date_range',
                'chip': false,
                'open': false,
            },

            {
                'name': 'Slider',
                'link': 'material-widgets/slider',
                'icon': 'keyboard_tab',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Slide Toggle',
                'link': 'material-widgets/slide-toggle',
                'icon': 'album',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Menu',
                'icon': 'menu',
                'link': 'material-widgets/menu',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Progress Bar',
                'link': 'material-widgets/progress-bar',
                'icon': 'trending_flat',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Input',
                'icon': 'input',
                'link': 'material-widgets/input',
                'open': false,
            },
            {
                'name': 'Radio',
                'icon': 'radio_button_checked',
                'link': 'material-widgets/radio',
                'chip': false,
                'open': false,
            },
            {
                'name': 'Select',
                'icon': 'select_all',
                'link': 'material-widgets/select',
                'open': false,
            },
        ]
    },
    // {
    //     'name'   : 'Forms',
    //     'icon'   : 'mode_edit',
    //     'open'   : false,
    //     'link'   : false,
    //     'sub'    :  [
    //                     {
    //                         'name': 'Template Driven',
    //                         'icon': 'mode_edit',
    //                         'open'   : false,
    //                         'link':'forms/template_forms'
    //                     },
    //                     {
    //                         'name': 'Reactive Forms',
    //                         'icon': 'text_fields',
    //                         'open'   : false,
    //                         'link':'forms/reactive_forms'
    //                     }
    //                 ]
    // },
    {
        'name': 'Tables',
        'icon': 'list',
        'link': false,
        'open': false,
        'chip': { 'value': 2, 'color': 'accent' },
        'sub': [
            {
                'name': 'Fixed',
                'icon': 'filter_list',
                'link': 'tables/fixed',
                'open': false,
            },
            {
                'name': 'Feature',
                'icon': 'done_all',
                'link': 'tables/featured',
                'open': false,
            },
            {
                'name': 'Responsive Tables',
                'icon': 'filter_center_focus',
                'link': 'tables/responsive',
                'open': false,
            }
        ]

    },
    {
        'name': 'Guarded Routes',
        'icon': 'mode_edit',
        'link': '/auth/guarded-routes',
        'open': false,
    }, {
        'name': 'Scrumboard',
        'open': false,
        'link': '/auth/scrumboard',
        'icon': 'grade',
    }, {
        'name': 'Applications',
        'icon': 'view_module',
        'open': false,
        'link': false,
        'sub': [
            {
                'name': 'chat',
                'icon': 'chat',
                'link': 'chats/chat',
                'open': false,
            },
            {
                'name': 'mail',
                'icon': 'mail',
                'link': 'mail/mail',
                'open': false,
            },
            {
                'name': 'Editor',
                'icon': 'editor',
                'link': 'editor/editor',
                'open': false,
            }
        ]
    }
    , {
        'name': 'Pages',
        'icon': 'content_copy',
        'open': false,
        'link': false,
        'sub': [
            {
                'name': 'Login',
                'icon': 'work',
                'open': false,
                'link': '../login',
            }, {
                'name': 'Services',
                'icon': 'local_laundry_service',
                'open': false,
                'link': 'pages/services',
            }, {
                'name': 'Contact',
                'icon': 'directions',
                'open': false,
                'link': 'pages/contact'
            }
        ]
    }
    , {

        'name': 'Charts',
        'icon': 'pie_chart_outlined',
        'open': false,
        'link': false,
        'sub': [
            {
                'name': 'chartjs',
                'icon': 'view_list',
                'link': 'charts/chartjs',
                'open': false,

            },
            {
                'name': 'ngx-chart',
                'icon': 'show_chart',
                'open': false,
                'link': 'charts/ngx-charts',
            },
            {
                'name': 'nvd3',
                'icon': 'pie_chart',
                'open': false,
                'link': 'charts/nvd3-charts',
            }
        ]
    }, {
        'name': 'maps',
        'icon': 'map',
        'open': false,
        'link': false,
        'sub': [
            {
                'name': 'google-map',
                'icon': 'directions',
                'link': 'maps/googlemap',
                'open': false,
            },
            {
                'name': 'leaflet-map',
                'icon': 'directions',
                'link': 'maps/leafletmap',
                'open': false,
            }
        ]
    }
];
