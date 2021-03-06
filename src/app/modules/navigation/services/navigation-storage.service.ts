import { Injectable } from '@angular/core';
import { navigationLinks } from '../constants/navigation.constants';
import { INavigationLink } from '../models/navigation-link.models';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { NavigationEnd, Router, Event, RouterEvent } from '@angular/router';
import { filter, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavigationStorageService {
  private navLinksSrc: BehaviorSubject<Array<INavigationLink>> = new BehaviorSubject<Array<INavigationLink>>(navigationLinks);
  private activeLinkSrc: BehaviorSubject<INavigationLink> = new BehaviorSubject<INavigationLink>(null);

  navLinks$: Observable<Array<INavigationLink>> = this.navLinksSrc.asObservable();
  activeLink$: Observable<INavigationLink> = this.activeLinkSrc.asObservable();

  get navLinks(): Array<INavigationLink> {
    return this.navLinksSrc.getValue();
  }

  get activeLink(): INavigationLink {
    return this.activeLinkSrc.getValue();
  }

  constructor(private router: Router) {}

  setActiveLink(activeLink: INavigationLink): void {
    this.activeLinkSrc.next({ ...activeLink });
  }

  initActiveLink(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      first()
    ).subscribe((event: RouterEvent) => {
        const activeLink = this.navLinks.find((link: INavigationLink) => event.url.toLowerCase().includes(link.path.toLowerCase()));
        if (activeLink) {
          this.setActiveLink(activeLink);
        } else {
          this.setActiveLink(this.navLinks[0]);
        }
      });
  }
}
