import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <md-toolbar color="primary">
        <span class="title">Recipe Finder</span>
        <a md-button routerLink="/search">Search</a>
        <a md-button routerLink="/shopping-list">Shopping List</a>
        <span style="flex-grow: 1"></span>
        <a md-button href="http://recipe-finder-vue.yizhao.me">Vue.js Version</a>
      </md-toolbar>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav span.title {
      margin-right: 2rem;
    }
  `]
})
export class AppComponent {
}
