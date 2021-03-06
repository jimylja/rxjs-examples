import { INavigationLink } from '../models/navigation-link.models';

export const navigationLinks: Array<INavigationLink> = [
  {
    path: 'observable',
    label: 'Observable',
    loadChildren: '../rxjs-observable/rxjs-observable.module#RxjsObservableModule'
  },
  {
    path: 'operators',
    label: 'Operators',
    loadChildren: '../rxjs-operators/rxjs-operators.module#RxjsOperatorsModule'
  },
  {
    path: 'subject',
    label: 'Subject',
    loadChildren: '../rxjs-subject/rxjs-subject.module#RxjsSubjectModule'
  },
  {
    path: 'scheduler',
    label: 'Scheduler',
    loadChildren: '../rxjs-scheduler/rxjs-scheduler.module#RxjsSchedulerModule'
  }
];
