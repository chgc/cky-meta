# 這專案的目的主要是用來學習怎麼封裝一個ngModule，可透過npm安裝到其他專案上.

# cky-meta
Update HTML meta tags for title, description and others automatically based on the route in your Angular2 app.

This is an Angular2 SEO/meta tags module. For the Angular 1.x module, check out ngMeta

Getting started

Install

To install this library, run:

```
$ npm install cky-meta --save
```

cky-meta works with angular2 ^2.3.1 and @angular/router 3.3.1 or higher. 可以跑AOT模式

# Modify routes

Add meta tags to routes. By default, title and description values are duplicated for og:title and og:description, so there's no need to add them separately.

```typescript
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      meta: {
        title: 'Home page',
        description: 'Description of the home page'
      }
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      meta: {
        title: 'Dashboard',
        description: 'Description of the dashboard page',
        'og:image': 'http://example.com/dashboard-image.png'
      }
    }
  }
];
```

# Import MetaModule

```typescript
...
import { MetaModule } from 'cky-meta';

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MetaModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
```

# Update AppComponent

```typescript
import { MetaService } from 'cky-meta';

@Component({
  ...
})
export class AppComponent {
  constructor(private metaService: MetaService) {}
}
```

You're all set! cky-meta will update the meta tags whenever the route changes.

# Options

Set defaults

Set default values for tags. These values are used when routes without meta: {} information are encountered.

```typescript
import { MetaConfig, MetaService } from 'cky-meta';

const metaConfig: MetaConfig = {
  //Append a title suffix such as a site name to all titles
  //Defaults to false
  useTitleSuffix: true,
  defaults: {
    title: 'Default title for pages without meta in their route',
    titleSuffix: ' | Site Name',
    'og:image': 'http://example.com/default-image.png',
    'any other': 'arbitrary tag can be used'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    ...,
    MetaModule.forRoot(metaConfig)
  ],
  bootstrap: [AppComponent]
})
```

# Change meta tags programmatically

```typescript
import { Component, OnInit } from '@angular/core';

class ProductComponent implements OnInit {
  ...
  constructor(private metaService: MetaService) {}

  ngOnInit() {
    this.product = //HTTP GET for product in catalogue
    this.metaService.setTitle('Product page for '+this.product.name);
    this.metaService.setTag('og:image',this.product.imageURL);
  }
}
```

Define fallback meta content in HTML

While Google executes Javascript and extracts meta tags set by cky-meta, many bots (like Facebook and Twitter) do not execute Javascript. Consider defining fallback meta tags in your HTML for such bots. The fallback content is overridden by ng2-meta in Javascript-enabled environments.

<html>
  <head>
    <meta name="title" content="Website Name">
    <meta name="og:title" content="Website Name">
    <meta name="description" content="General description of your site">
    <meta name="og:description" content="General description of your site">
    <meta name="og:image" content="http://example.com/fallback-image.png">
  </head>
</html>

### 這專案是參考ng2-meta寫的
https://github.com/vinaygopinath/ng2-meta
