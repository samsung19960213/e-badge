export const adminMenu = [
    {
        'name': 'Dashboard',
        'icon': 'dashboard',
        'link': '/auth/dashboard',
        'user':[1,2,3] ,
        'chip': { 'value': 1, 'color': 'accent' },

    },
    {
        'name': 'Holidays',
        'icon': 'list',
        'link': '/auth/pages/holidays',
        'user':[1,2,3] ,
        

    },
    
    

    {
        'name': 'Employees',
        'icon': 'people',
        'link': false,
        'open': false,
        'user':[1,2],
        'sub': [
            {
                'name': 'Add Employees',
                'link': 'employees/add-employees',
                'icon': 'person_add',
                'chip': false,
                'user': [1,2],
                'open': false,
            },

            {
                'name': 'Employee List',
                'link': 'employees/employee-table',
                'icon': 'people',
                'user': [1,2],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Inactive Employees',
                'link': 'employees/deactivated-employees',
                'icon': 'people_outline',
                'user': [1],
                'chip': false,
                'open': false,
            }


        ]
    },
    {
        'name': 'Attendance',
        'icon': 'account_box',
        'user':[1,2,3],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': 'Missed Checkout',
                'link': 'attendance/checkout-request',
                'icon': 'eject',
                'user': [1,2,3],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Absentees List',
                'link': 'attendance/absentees',
                'icon': 'account_circle',
                'user': [1,2],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Present List',
                'link': 'attendance/present',
                'icon': 'person_outline',
                'user': [1,2],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Late Comers List',
                'link': 'attendance/late-comers',
                'icon': 'schedule',
                'user': [1,2],
                'chip': false,
                'open': false,
            },
            // {
            //     'name': 'Montly Absentees List',
            //     'link': 'attendance/monthly-absentees',
            //     'icon': 'account_circle',
            //     'user':2,
            //     'chip': false,
            //     'open': false,
            // },

           


        ]
    },
    {
        'name': 'Work-F-Home',
        'icon': 'inbox',
        'user': [1,2,3],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': 'Apply W-F-Home',
                'icon': 'home',
                'link': 'attendance/apply-wfh',
                'open': false,
                'user':[1,2,3],

            },
            {
                'name': 'W-F-H Requests',
                'icon': 'inbox',
                'link': 'attendance/work-from-home',
                'open': false,
                'user': [1,2,3],

            },
            {
                'name': 'Immediate action W-F-H',
                'icon': 'inbox',
                'link': 'attendance/immediate/work-from-home',
                'open': false,
                'user':[1,2],

            },
        ]
    },
    {
        'name': 'Leave',
        'icon': 'inbox',
        'user':[1,2,3],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': 'Apply Leave',
                'link': 'leaves/apply-leave',
                'icon': 'drafts',
                'user':[1,2,3],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Leave Requests',
                'link': 'leaves/leave-list',
                'icon': 'drafts',
                'user':[1,2,3],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Immediate Action',
                'link': 'leaves/pending-leaves',
                'icon': 'mail',
                'user':[1,2],
                'chip': false,
                'open': false,
            },
        ]
    },
    {
        'name': 'Reports',
        'icon': 'assignment',
        'user':[1,2],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': ' Attendance Reports',
                'icon': 'assignment',
                'link': '/auth/reports',
                'open': false,
                'user':[1,2],

            },
            {
                'name': 'Leave Reports',
                'icon': 'assignment',
                'link': '/auth/reports/leave-reports',
                'open': false,
                'user':[1,2],
            },
        ],

    },
    {
        'name': 'Settings',
        'icon': 'build',
        'link': false,
        'open': false,
        'user':[1,2],
        'sub': [
            {
                'name': 'Office',
                'icon': 'work',
                'link': '/auth/office',
                'open': false,
                'user': [1]
            },

            {
                'name': 'Leave',
                'link': 'leaves/add-leave',
                'icon': 'inbox',
                'user': [1,2],
                'chip': false,
                'open': false,
            },
            


        ]
    },

];

export const hrManagerMenu = [
    {
        'name': 'Dashboard',
        'icon': 'dashboard',
        'link': '/auth/dashboard',
        'user':[1,2,3] ,
        'chip': { 'value': 1, 'color': 'accent' },

    },
    {
        'name': 'Holidays',
        'icon': 'list',
        'link': '/auth/pages/holidays',
        'user':[1,2,3] ,
        

    },
    {
        'name': 'Employees',
        'icon': 'people',
        'link': false,
        'open': false,
        'user':[1,2],
        'sub': [
            {
                'name': 'Add Employees',
                'link': 'employees/add-employees',
                'icon': 'person_add',
                'chip': false,
                'user': [1,2],
                'open': false,
            },

            {
                'name': 'Employee List',
                'link': 'employees/employee-table',
                'icon': 'people',
                'user': [1,2],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Inactive Employees',
                'link': 'employees/deactivated-employees',
                'icon': 'people_outline',
                'user': [1],
                'chip': false,
                'open': false,
            }


        ]
    },
    {
        'name': 'Attendance',
        'icon': 'account_box',
        'user':[1,2,3],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': 'Missed Checkout',
                'link': 'attendance/checkout-request',
                'icon': 'eject',
                'user': [1,2,3],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Absentees List',
                'link': 'attendance/absentees',
                'icon': 'account_circle',
                'user': [1,2],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Present List',
                'link': 'attendance/present',
                'icon': 'person_outline',
                'user': [1,2],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Late Comers List',
                'link': 'attendance/late-comers',
                'icon': 'schedule',
                'user': [1,2],
                'chip': false,
                'open': false,
            },
            // {
            //     'name': 'Montly Absentees List',
            //     'link': 'attendance/monthly-absentees',
            //     'icon': 'account_circle',
            //     'user':2,
            //     'chip': false,
            //     'open': false,
            // },

           


        ]
    },
    {
        'name': 'Work-F-Home',
        'icon': 'inbox',
        'user': [1,2,3],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': 'Apply W-F-Home',
                'icon': 'home',
                'link': 'attendance/apply-wfh',
                'open': false,
                'user':[1,2,3],

            },
            {
                'name': 'W-F-H Requests',
                'icon': 'inbox',
                'link': 'attendance/work-from-home',
                'open': false,
                'user': [1,2,3],

            },
            {
                'name': 'Immediate action W-F-H',
                'icon': 'inbox',
                'link': 'attendance/immediate/work-from-home',
                'open': false,
                'user':[1,2],

            },
        ]
    },
    {
        'name': 'Leave',
        'icon': 'inbox',
        'user':[1,2,3],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': 'Apply Leave',
                'link': 'leaves/apply-leave',
                'icon': 'drafts',
                'user':[1,2,3],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Leave Requests',
                'link': 'leaves/leave-list',
                'icon': 'drafts',
                'user':[1,2,3],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Immediate Action',
                'link': 'leaves/pending-leaves',
                'icon': 'mail',
                'user':[1,2],
                'chip': false,
                'open': false,
            },
        ]
    },
    {
        'name': 'Reports',
        'icon': 'assignment',
        'user':[1,2],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': ' Attendance Reports',
                'icon': 'assignment',
                'link': '/auth/reports',
                'open': false,
                'user':[1,2],

            },
            {
                'name': 'Leave Reports',
                'icon': 'assignment',
                'link': '/auth/reports/leave-reports',
                'open': false,
                'user':[1,2],
            },
        ],

    },


];

export const reportingManagerMenu = [
    {
        'name': 'Dashboard',
        'icon': 'dashboard',
        'link': '/auth/dashboard',
        'user':[1,2,3] ,
        'chip': { 'value': 1, 'color': 'accent' },

    },

    {
        'name': 'Holidays',
        'icon': 'list',
        'link': '/auth/pages/holidays',
        'user':[1,2,3] ,
        

    },


    {
        'name': 'Employees',
        'icon': 'people',
        'link': false,
        'open': false,
        'user':[1,2],
        'sub': [
            {
                'name': 'Add Employees',
                'link': 'employees/add-employees',
                'icon': 'person_add',
                'chip': false,
                'user': [1,2],
                'open': false,
            },

            {
                'name': 'Employee List',
                'link': 'employees/employee-table',
                'icon': 'people',
                'user': [1,2],
                'chip': false,
                'open': false,
            }


        ]
    },
    {
        'name': 'Attendance',
        'icon': 'account_box',
        'user':[1,2,3],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': 'Missed Checkout',
                'link': 'attendance/checkout-request',
                'icon': 'eject',
                'user': [1,2,3],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Absentees List',
                'link': 'attendance/absentees',
                'icon': 'account_circle',
                'user': [1,2],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Present List',
                'link': 'attendance/present',
                'icon': 'person_outline',
                'user': [1,2],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Late Comers List',
                'link': 'attendance/late-comers',
                'icon': 'schedule',
                'user': [1,2],
                'chip': false,
                'open': false,
            }

           


        ]
    },
    {
        'name': 'Work-F-Home',
        'icon': 'inbox',
        'user': [1,2,3],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': 'Apply W-F-Home',
                'icon': 'home',
                'link': 'attendance/apply-wfh',
                'open': false,
                'user':[1,2,3],

            },
            {
                'name': 'W-F-H Requests',
                'icon': 'inbox',
                'link': 'attendance/work-from-home',
                'open': false,
                'user': [1,2,3],

            },
            {
                'name': 'Immediate action W-F-H',
                'icon': 'inbox',
                'link': 'attendance/immediate/work-from-home',
                'open': false,
                'user':[1,2],

            },
        ]
    },
    {
        'name': 'Leave',
        'icon': 'inbox',
        'user':[1,2,3],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': 'Apply Leave',
                'link': 'leaves/apply-leave',
                'icon': 'drafts',
                'user':[1,2,3],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Leave Requests',
                'link': 'leaves/leave-list',
                'icon': 'drafts',
                'user':[1,2,3],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Immediate Action',
                'link': 'leaves/pending-leaves',
                'icon': 'mail',
                'user':[1,2],
                'chip': false,
                'open': false,
            },
        ]
    },
    {
        'name': 'Reports',
        'icon': 'assignment',
        'user':[1,2],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': ' Attendance Reports',
                'icon': 'assignment',
                'link': '/auth/reports',
                'open': false,
                'user':[1,2],

            },
            {
                'name': 'Leave Reports',
                'icon': 'assignment',
                'link': '/auth/reports/leave-reports',
                'open': false,
                'user':[1,2],
            },
        ],

    },


];

export const userMenu = [
    {
        'name': 'Dashboard',
        'icon': 'dashboard',
        'link': '/auth/dashboard',
        'user':[1,2,3] ,
        'chip': { 'value': 1, 'color': 'accent' },

    },


    {
        'name': 'Holidays',
        'icon': 'list',
        'link': '/auth/pages/holidays',
        'user':[1,2,3] ,
        

    },
    

    
    {
        'name': 'Attendance',
        'icon': 'account_box',
        'user':[1,2,3],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': 'Missed Checkout',
                'link': 'attendance/checkout-request',
                'icon': 'eject',
                'user': [1,2,3],
                'chip': false,
                'open': false,
            }
           


        ]
    },
    {
        'name': 'Work-F-Home',
        'icon': 'inbox',
        'user': [1,2,3],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': 'Apply W-F-Home',
                'icon': 'home',
                'link': 'attendance/apply-wfh',
                'open': false,
                'user':[1,2,3],

            },
            {
                'name': 'W-F-H Requests',
                'icon': 'inbox',
                'link': 'attendance/work-from-home',
                'open': false,
                'user': [1,2,3],

            }
        ]
    },
    {
        'name': 'Leave',
        'icon': 'inbox',
        'user':[1,2,3],
        'link': false,
        'open': false,

        'sub': [
            {
                'name': 'Apply Leave',
                'link': 'leaves/apply-leave',
                'icon': 'drafts',
                'user':[1,2,3],
                'chip': false,
                'open': false,
            },
            {
                'name': 'Leave Requests',
                'link': 'leaves/leave-list',
                'icon': 'drafts',
                'user':[1,2,3],
                'chip': false,
                'open': false,
            }
        ]
    },
    

];