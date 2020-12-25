import Buttons from 'views/Components/Buttons.js';
import Calendar from 'views/Calendar/Calendar.js';
import Charts from 'views/Charts/Charts.js';
import Dashboard from 'views/Dashboard/Dashboard.js';
import ErrorPage from 'views/Pages/ErrorPage.js';
import ExtendedForms from 'views/Forms/ExtendedForms.js';
import ExtendedTables from 'views/Tables/ExtendedTables.js';
import FullScreenMap from 'views/Maps/FullScreenMap.js';
import GoogleMaps from 'views/Maps/GoogleMaps.js';
import GridSystem from 'views/Components/GridSystem.js';
import Icons from 'views/Components/Icons.js';
import LockScreenPage from 'views/Pages/LockScreenPage.js';
import LoginPage from 'views/Pages/LoginPage.js';
import Notifications from './views/Components/Notifications.js';
import Panels from 'views/Components/Panels.js';
import PricingPage from 'views/Pages/PricingPage.js';
import RTLSupport from 'views/Pages/RTLSupport.js';
import ReactTables from './views/Tables/ReactTables.js';
import RegisterPage from 'views/Pages/RegisterPage.js';
import RegularForms from 'views/Forms/RegularForms.js';
import RegularTables from 'views/Tables/RegularTables.js';
import SweetAlert from 'views/Components/SweetAlert.js';
import TimelinePage from 'views/Pages/Timeline.js';
import Typography from 'views/Components/Typography.js';
import UserProfile from 'views/Pages/UserProfile.js';
import ValidationForms from 'views/Forms/ValidationForms.js';
import VectorMap from 'views/Maps/VectorMap.js';
import Widgets from 'views/Widgets/Widgets.js';
import Wizard from 'views/Forms/Wizard.js';

import AdminParamsTables from './views/Tables/AdminParamsTables';
import AvailabilitySlotsTables from './views/Tables/AvailabilitySlotsTables';
import BookingsTables from './views/Tables/BookingsTables';
import BookingStatusHistoryTables from './views/Tables/BookingStatusHistoryTables';
import DriversTables from './views/Tables/DriversTables';
import DoctorsTables from './views/Tables/DoctorsTables';
import ConsoleUsersTables from './views/Tables/ConsoleUsersTables';
import NursesTables from './views/Tables/NursesTables';
import TrackVansTables from './views/Tables/TrackVansTables';
import UsersTables from './views/Tables/UsersTables';
import UserInterfaceIdTables from './views/Tables/UserInterfaceIdTables';
import UserNotificationTables from './views/Tables/UserNotificationTables';
import LabResultTables from './views/Tables/LabResultTables';
import LabTestTables from './views/Tables/LabTestTables';
import FaqTables from './views/Tables/FaqTables';
import ConsultationTables from './views/Tables/ConsultationTables';
import TransactionTables from './views/Tables/TransactionTables';
import PatientsTables from './views/Tables/PatientsTables';
import LocationTrackingTables from './views/Tables/LocationTrackingTables';


// @material-ui/icons
import Apps from '@material-ui/icons/Apps';
import DriveEta from '@material-ui/icons/DriveEta';
import PersonAdd from '@material-ui/icons/PersonAdd';
import LocalPharmacy from '@material-ui/icons/LocalPharmacy';
import LocalHospital from '@material-ui/icons/LocalHospital';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import AirportShuttle from '@material-ui/icons/AirportShuttle';
import Colorize from '@material-ui/icons/Colorize';
import Edit from '@material-ui/icons/Edit';
import Info from '@material-ui/icons/Info';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import CreditCard from '@material-ui/icons/CreditCard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import Bookmark from '@material-ui/icons/Bookmark';
import Bookmarks from '@material-ui/icons/Bookmarks';
import Contacts from '@material-ui/icons/Contacts';
import AddAlert from '@material-ui/icons/AddAlert';

import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRange from '@material-ui/icons/DateRange';
import GridOn from '@material-ui/icons/GridOn';
import Image from '@material-ui/icons/Image';
import Place from '@material-ui/icons/Place';
import Timeline from '@material-ui/icons/Timeline';
import WidgetsIcon from '@material-ui/icons/Widgets';

var dashRoutes = [

  {
    path: '/param-admin',
    name: 'Admin Param',
    rtlName: 'الحجوزات',
    icon: Person,
    component: AdminParamsTables,
    layout: '/admin',
    role: 'admin'
  },
  {
    path: '/bookings',
    name: 'Bookings',
    rtlName: 'الحجوزات',
    icon: Bookmark,
    component: BookingsTables,
    layout: '/admin',
    role: 'admin'
  },
  // {
  //   path: '/booking-history',
  //   name: 'Booking History',
  //   rtlName: 'سجل الحجز',
  //   icon: Bookmarks,
  //   component: BookingStatusHistoryTables,
  //   layout: '/admin',
  //   role: 'admin'
  // },
  {
    path: '/availability-slot',
    name: 'Availability Slot',
    rtlName: 'الحجوزات',
    icon: LibraryBooks,
    component: AvailabilitySlotsTables,
    layout: '/admin',
    role: 'admin',
  },
  {
    path: '/drivers',
    name: 'Drivers',
    rtlName: 'Drivers',
    icon: DriveEta,
    component: DriversTables,
    layout: '/admin',
    role: 'admin',
  },
  {
    path: '/doctors',
    name: 'Doctors',
    rtlName: 'Doctors',
    icon: LocalHospital,
    component: DoctorsTables,
    layout: '/admin',
    role: 'admin',
  },
  {
    path: '/console-users',
    name: 'Console Users',
    rtlName: 'مستخدمي وحدة التحكم',
    icon: AssignmentInd,
    component: ConsoleUsersTables,
    layout: '/admin',
    role: 'admin',
  },
  {
    path: '/nurses',
    name: 'Nurses',
    rtlName: 'Nurses',
    icon: LocalPharmacy,
    component: NursesTables,
    layout: '/admin',
    role: 'admin',
  },
  {
    path: '/track-vans',
    name: 'Track Vans',
    rtlName: 'Track Vans',
    icon: AirportShuttle,
    component: TrackVansTables,
    layout: '/admin',
    role: 'admin',
  },
  {
    path: '/users',
    name: 'Users',
    rtlName: 'Users',
    icon: PersonAdd,
    component: UsersTables,
    layout: '/admin',
    role: 'admin',
  },
  {
    path: '/interface-user',
    name: 'Users Interface',
    rtlName: 'واجهة المستخدم',
    icon: Contacts,
    component: UserInterfaceIdTables,
    layout: '/admin',
    role: 'admin',
  },
  {
    path: '/notification-user',
    name: 'Users Notification',
    rtlName: 'واجهة المستخدم',
    icon: AddAlert,
    component: UserNotificationTables,
    layout: '/admin',
    role: 'admin',
  },
  // {
  //   path: '/lab-result',
  //   name: 'Lab Results',
  //   rtlName: 'نتيجة المختبر',
  //   icon: Colorize,
  //   component: LabResultTables,
  //   layout: '/admin',
  //   role: 'admin',
  // },
  {
    path: '/lab-test',
    name: 'Lab Tests',
    rtlName: 'التحاليل المخبرية',
    icon: Edit,
    component: LabTestTables,
    layout: '/admin',
    role: 'admin',
  },
  {
    path: '/faq',
    name: 'FAQ',
    rtlName: 'نتيجة المختبر',
    icon: Info,
    component: FaqTables,
    layout: '/admin',
    role: 'admin',
  },
  // {
  //   path: '/consultation',
  //   name: 'Consultation',
  //   rtlName: 'التشاور',
  //   icon: RecordVoiceOverIcon,
  //   component: ConsultationTables,
  //   layout: '/admin',
  //   role: 'doctor',
  // },
  // {
  //   path: '/transaction',
  //   name: 'Transaction',
  //   rtlName: 'عملية تجارية',
  //   icon: CreditCard,
  //   component: TransactionTables,
  //   layout: '/admin',
  //   role: 'admin',
  // },
  {
    path: '/patients',
    name: 'Patients',
    rtlName: 'عملية تجارية',
    icon: AccountCircle,
    component: PatientsTables,
    layout: '/admin',
    role: 'doctor',
  },
  // {
  //   path: '/location-track',
  //   name: 'Location Track',
  //   rtlName: 'تتبع الموقع',
  //   icon: Place,
  //   component: LocationTrackingTables,
  //   layout: '/admin',
  //   role: 'admin',
  // },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   rtlName: 'لوحة القيادة',
  //   icon: DashboardIcon,
  //   component: Dashboard,
  //   layout: '/admin',
  //   role: 'admin',
  // },
  {
    path: '/login-page',
    name: 'Serenia',
    rtlName: 'هعذاتسجيل الدخول',
    mini: 'L',
    rtlMini: 'هعذا',
    component: LoginPage,
    layout: '/auth',
    role: 'failed',
  },
  // {
  //   collapse: true,
  //   name: 'Pages',
  //   rtlName: 'صفحات',
  //   icon: Image,
  //   state: 'pageCollapse',
  //   views: [
  // {
  //   path: '/pricing-page',
  //   name: 'Pricing Page',
  //   rtlName: 'عالتسعير',
  //   mini: 'PP',
  //   rtlMini: 'ع',
  //   component: PricingPage,
  //   layout: '/auth',
  // },
  // {
  //   path: '/rtl-support-page',
  //   name: 'RTL Support',
  //   rtlName: 'صودعم رتل',
  //   mini: 'RS',
  //   rtlMini: 'صو',
  //   component: RTLSupport,
  //   layout: '/rtl',
  // },
  // {
  //   path: '/timeline-page',
  //   name: 'Timeline Page',
  //   rtlName: 'تيالجدول الزمني',
  //   mini: 'T',
  //   rtlMini: 'تي',
  //   component: TimelinePage,
  //   layout: '/admin',
  //   role: 'admin',
  // },
  // {
  //   path: '/login-page',
  //   name: 'Serenia',
  //   rtlName: 'هعذاتسجيل الدخول',
  //   mini: 'L',
  //   rtlMini: 'هعذا',
  //   component: LoginPage,
  //   layout: '/auth',
  // },
  // {
  //   path: '/register-page',
  //   name: 'Register Page',
  //   rtlName: 'تسجيل',
  //   mini: 'R',
  //   rtlMini: 'صع',
  //   component: RegisterPage,
  //   layout: '/auth',
  // },
  // {
  //   path: '/lock-screen-page',
  //   name: 'Lock Screen Page',
  //   rtlName: 'اقفل الشاشة',
  //   mini: 'LS',
  //   rtlMini: 'هذاع',
  //   component: LockScreenPage,
  //   layout: '/auth',
  // },
  // {
  //   path: '/user-page',
  //   name: 'User Profile',
  //   rtlName: 'ملف تعريفي للمستخدم',
  //   mini: 'UP',
  //   rtlMini: 'شع',
  //   component: UserProfile,
  //   layout: '/admin',
  //   role: 'admin',
  // },
  // {
  //   path: '/error-page',
  //   name: 'Error Page',
  //   rtlName: 'صفحة الخطأ',
  //   mini: 'E',
  //   rtlMini: 'البريد',
  //   component: ErrorPage,
  //   layout: '/auth',
  // },
  // ],
  //   },
  // {
  //   collapse: true,
  //   name: 'Components',
  //   rtlName: 'المكونات',
  //   icon: Apps,
  //   state: 'componentsCollapse',
  //   views: [
  //     {
  //       collapse: true,
  //       name: 'Multi Level Collapse',
  //       rtlName: 'انهيار متعدد المستويات',
  //       mini: 'MC',
  //       rtlMini: 'ر',
  //       state: 'multiCollapse',
  //       views: [
  //         {
  //           path: '/buttons',
  //           name: 'Buttons',
  //           rtlName: 'وصفت',
  //           mini: 'B',
  //           rtlMini: 'ب',
  //           component: Buttons,
  //           layout: '/admin',
  //           role: 'admin',
  //         },
  //       ],
  //     },
  //     {
  //       path: '/buttons',
  //       name: 'Buttons',
  //       rtlName: 'وصفت',
  //       mini: 'B',
  //       rtlMini: 'ب',
  //       component: Buttons,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //     {
  //       path: '/grid-system',
  //       name: 'Grid System',
  //       rtlName: 'نظام الشبكة',
  //       mini: 'GS',
  //       rtlMini: 'زو',
  //       component: GridSystem,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //     {
  //       path: '/panels',
  //       name: 'Panels',
  //       rtlName: 'لوحات',
  //       mini: 'P',
  //       rtlMini: 'ع',
  //       component: Panels,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //     {
  //       path: '/sweet-alert',
  //       name: 'Sweet Alert',
  //       rtlName: 'الحلو تنبيه',
  //       mini: 'SA',
  //       rtlMini: 'ومن',
  //       component: SweetAlert,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //     {
  //       path: '/notifications',
  //       name: 'Notifications',
  //       rtlName: 'إخطارات',
  //       mini: 'N',
  //       rtlMini: 'ن',
  //       component: Notifications,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //     {
  //       path: '/icons',
  //       name: 'Icons',
  //       rtlName: 'الرموز',
  //       mini: 'I',
  //       rtlMini: 'و',
  //       component: Icons,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //     {
  //       path: '/typography',
  //       name: 'Typography',
  //       rtlName: 'طباعة',
  //       mini: 'T',
  //       rtlMini: 'ر',
  //       component: Typography,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: 'Forms',
  //   rtlName: 'إستمارات',
  //   icon: 'content_paste',
  //   state: 'formsCollapse',
  //   views: [
  //     {
  //       path: '/regular-forms',
  //       name: 'Regular Forms',
  //       rtlName: 'أشكال عادية',
  //       mini: 'RF',
  //       rtlMini: 'صو',
  //       component: RegularForms,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //     {
  //       path: '/extended-forms',
  //       name: 'Extended Forms',
  //       rtlName: 'نماذج موسعة',
  //       mini: 'EF',
  //       rtlMini: 'هوو',
  //       component: ExtendedForms,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //     {
  //       path: '/validation-forms',
  //       name: 'Validation Forms',
  //       rtlName: 'نماذج التحقق من الصحة',
  //       mini: 'VF',
  //       rtlMini: 'تو',
  //       component: ValidationForms,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //     {
  //       path: '/wizard',
  //       name: 'Wizard',
  //       rtlName: 'ساحر',
  //       mini: 'W',
  //       rtlMini: 'ث',
  //       component: Wizard,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: 'Tables',
  //   rtlName: 'الجداول',
  //   icon: GridOn,
  //   state: 'tablesCollapse',
  //   views: [
  //     {
  //       path: '/regular-tables',
  //       name: 'Regular Tables',
  //       rtlName: 'طاولات عادية',
  //       mini: 'RT',
  //       rtlMini: 'صر',
  //       component: RegularTables,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //     {
  //       path: '/extended-tables',
  //       name: 'Extended Tables',
  //       rtlName: 'جداول ممتدة',
  //       mini: 'ET',
  //       rtlMini: 'هور',
  //       component: ExtendedTables,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //     {
  //       path: '/react-tables',
  //       name: 'React Tables',
  //       rtlName: 'رد فعل الطاولة',
  //       mini: 'RT',
  //       rtlMini: 'در',
  //       component: ReactTables,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: 'Maps',
  //   rtlName: 'خرائط',
  //   icon: Place,
  //   state: 'mapsCollapse',
  //   views: [
  //     {
  //       path: '/google-maps',
  //       name: 'Google Maps',
  //       rtlName: 'خرائط جوجل',
  //       mini: 'GM',
  //       rtlMini: 'زم',
  //       component: GoogleMaps,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //     {
  //       path: '/full-screen-maps',
  //       name: 'Full Screen Map',
  //       rtlName: 'خريطة كاملة الشاشة',
  //       mini: 'FSM',
  //       rtlMini: 'ووم',
  //       component: FullScreenMap,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //     {
  //       path: '/vector-maps',
  //       name: 'Vector Map',
  //       rtlName: 'خريطة المتجه',
  //       mini: 'VM',
  //       rtlMini: 'تم',
  //       component: VectorMap,
  //       layout: '/admin',
  //       role: 'admin',
  //     },
  //   ],
  // },
  // {
  //   path: '/widgets',
  //   name: 'Widgets',
  //   rtlName: 'الحاجيات',
  //   icon: WidgetsIcon,
  //   component: Widgets,
  //   layout: '/admin',
  //   role: 'admin',
  // },
  // {
  //   path: '/charts',
  //   name: 'Charts',
  //   rtlName: 'الرسوم البيانية',
  //   icon: Timeline,
  //   component: Charts,
  //   layout: '/admin',
  //   role: 'admin',
  // },
  // {
  //   path: '/calendar',
  //   name: 'Calendar',
  //   rtlName: 'التقويم',
  //   icon: DateRange,
  //   component: Calendar,
  //   layout: '/admin',
  //   role: 'admin',
  // },
];
export default dashRoutes;
