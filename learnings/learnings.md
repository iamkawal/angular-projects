# Learnings from Angular: the complete guide

## Section 11

### Lecture 129

1. To apply a css class on a `<a></a>` tag, whenever the routerLink corresponding to that `<a></a>` gets hit, use the directive `routerLinkActive`. For example:
   `<li routerLinkActive="active"> <a routerLink="/">Home</a> </li>`
   Whenever the app hits `/` route, a css class "active" will be put on this list item.

2. Consider the following scenario: Your app has three anchor tags inside list items:
   "/", "/users", "/servers"
   If you set `routerLinkActive="active"` on all of these three, whenever you hit `/users`, the css class "active" will be set on `/` as well. (same scenario with `/servers`). The reason is that, by default, `routerLinkActive` applies css classes, if a route is part of the current route.

   another ex: let's say links are `/`, `/user` and `/user/bob` and `routerLinkActive="blah"` is set for all three of them. Css class will be applied to `/user/bob` , `/user` and `/` whenever any of these are actually hit.

3. To avoid the behaviour described in point 2, we can set the property `routerLinkActiveOptions` of the directive `routerLinkActive` to `{exact: true}`. This will make sure that the class is applied **only** when the url exactly matches the current url.

4. Multiple css classes can be applied. For ex: `[routerLinkActive]="['class1', 'class2']"`

### Lecture 130

1. Routing to a url from within the code. Let's say when a user hits a button, we want to do something complex and then automatically route to a certain url. To do that we can use `Router` service. Need to initialize your component with this service (inside the constructor). After that you can write: `this.router.navigate(['pathToNavigateTo'])`
   [link to documentation for navigate()](https://angular.io/api/router/Router#navigate)

### Lecture 131

1. By default, `router.navigate()` navigation is absolute. i.e. if we do `router.navigate("['apples']")`. The router will navigate to `localhost:4200/apples`. To navigate to a relative path programatically, we need to intialize our component with `ActivatedRoute` and then pass in `NavigationExtras` while navigating to a URL: `this.router.navigate("['apples']", {relativeTo: this.currentRoute})`

   ```ts
      constructor(private router: Router, private currentRoute: ActivatedRoute) {}

      onSave() {
         this.router.navigate("['apples']", {relativeTo: this.currentRoute})
      }
   ```

   This way, we will route to `whatever-the-current-url-was/apples`

   [link to documentation for NavigationExtras](https://angular.io/api/router/NavigationExtras#navigationextras)

2. `ActivatedRoute` provides access to information about a route associated with a component that is loaded in an outlet.

### Lecture 132

1. Passing parameters to routes: While intializing routes in `app.module.ts` we can say:

   ```ts
      routes: Routes = [
         {path: '/users/:id', component: the-user-component-with-specific-id}
      ]
   ```

### Lecture 133

1. To fetch parameters in currentURL, we can use `snapshot` method in `ActivatedRoute`:

   ```ts
      constructor(private currentRoute: ActivatedRoute) {}

      ngOnInit() {
       this.user = {
         id: this.currentRoute.snapshot.params["id"],
         name: this.currentRoute.snapshot.params["name"],
       };
     }
   ```

### Lecture 134

1. Situation: Data for Component A doesn't change when **routed to Component A **from** Component A**

   ```ts
   // let's say we have this route defined:
   routes: Routes[{ path: "/users/:id/:name", UserComponent }];
   ```

   ```html
   // let's say the user component template looks like this:
   <p>User with ID: {{ user.id }}.</p>
   <p>User name: {{ user.name }}</p>
   ```

   ```ts
   // and user component ts looks like this
   export class UserComponent implements OnInit {
     user: { id: number; name: string };

     constructor(private currentRoute: ActivatedRoute) {}

     ngOnInit() {
       this.user = {
         id: this.currentRoute.snapshot.params["id"],
         name: this.currentRoute.snapshot.params["name"],
       };
     }
   }
   ```

   ```txt
      //whenever we hit a url like let's say /users/1/kawal we expect to see:
      User with ID: 1
      User name is kawal
   ```

   _and we do see that_. ok this is great. But let's say if **we add an anchor tag in the UserComponent template that routes to UserComponent**. Something like this:

   ```html
   <p>User with ID {{ user.id }}.</p>
   <p>User name is {{ user.name }}</p>

   <a [routerLink]="['/users', 10, 'Anna']">load Anna (10)</a>
   ```

   Now if we click this anchor tag we expect to see :

   ```txt
         User with ID: 10
         User name is Anna

         load Anna (10)
   ```

   But what really happens is this: _The template data doesn't change_

   ```txt
         User with ID: 1
         User name is Kawal

         load Anna (10)
   ```

   This is happening because the `this.user` didn't change when the `ActivatedRoute` changed. This didn't happen because angular didn't re-render the `userComponent template` because it was **already** on that component. The `ngOnInit` didn't run, as a result, `this.user` didn't get updated.

   To fix this: we can subscribe to `this.currentRoute.params` in `ngOnInit` like this:

   ```ts
      ngOnInit() {
       let paramsSubscription = this.currentRoute.params.subscribe((params: Params) => {
         this.user = {
           id: params["id"],
           name: params["name"],
         };
       });
      }
   ```

### Lecture 135

1. Angular ~~cleans up the subscriptions in a component whenever a component is destroyed~~. To be safe, implementing ngOnDestroy and then unsubscribing the subscription can benifit. That means your subscription won't be living in memory even if your component is destroyed.

   **Correction**: Angular cleans up only those subscriptions that correspond to observables provided by angular. Any subscriptions that correspond to custom made observables/subjects will not be destroyed by angular.

   ```ts
      ngOnDestroy() {
         this.paramsSubscription.unsubscribe()
      }
   ```

### Lecture 136

1. Passing query parameters to routes from html templates:

   ```html
   <div class="list-group">
     <a
       [routerLink]="['/servers', 5, 'edit']"
       [queryParams]="{ allowEdit: '1' }"
       fragment="loading"
       href="#"
       class="list-group-item"
       *ngFor="let server of servers"
     >
       {{ server.name }}
     </a>
   </div>
   ```

   the url becomes: `/servers/5/edit` (coming from router Link), `?allowEdit=1` (coming from `queryParams` property of routerLink directive), `#loading` (coming from `fragment` property of `routerLink` directive)
   Concatened together, the url becomes: `/servers/5/edit?allowEdit=1#loading` <- This is the url that the `routerLink` will navigate to.

2. `fragment` is used to point to a certain section of the webpage.

3. Passing query params from within the code while routing:

   ```ts
   this.router.navigate("['apples']", {
     queryParams: { allowEdit: "1" },
     fragment: "loading",
   });
   ```

### Lecture 137

1. Capturing query params:
   Let's say you have a homeComponent which has a button that directs to this URL: `/users/:id?allowEdit=1#loading` and loads some userComponent. We might like to capture the param `id`, the queryParam `allowEdit` and the fragment `loading`. How do we do this? very simple: just use the observables provided in the Route.

   ```ts
   export class EditServerComponent implements OnInit {
      queryParams:
     constructor(private route: ActivatedRoute) {}

     ngOnInit() {
        // remember to unsubscribe these subscription in ngOnDestroy
       querParamsSubscription = this.route.queryParams.subscribe((queryParams)=> console.log(queryParams));
       paramsSubscription = this.route.params.subscribe((params)=> console.log(params));
       routeSubscription = this.route.fragment.subscribe((fragment)=> console.log(fragment));
     }
   }
   ```

### Lecture 139

1. Adding child routes. Let's say you have these routes:

   ```ts
   routes: Routes = [
     { path: "servers", component: ServersComponent },
     { path: "servers/:id", component: ServerComponent },
     { path: "servers/:id/edit", component: EditServerComponent },
   ];
   ```

   We can see that we have three routes that start with 'servers'. There is a better way of defining routes that will give us the ability to do more. Since `servers/:id` and `servers/:id/edit` are made off of `servers`, we can define them as child routes.

2. Defining child routes: any Route can have a `children` property where we can define child routes. Note that `children` property accepts a list of routes.

   ```ts
   routes: Routes = [
     {
       path: "servers",
       component: ServersComponent,
       children: [
         { path: ":id", component: ServerComponent },
         { path: ":id/edit", component: EditServerComponent },
       ],
     },
   ];
   ```

3. So what extra functionality does this give us? If we had the routes listed in point 1, an exact component is rendered whenever the url matches a pattern. What if we want to load `ServerComponent` besides `ServersComponent` whenever the routes changes to `servers/:id`.

   Well, we can do that by adding a `router-outlet` tag in `ServersComponent`. Now assuming we have routes set up the same way as described in point 2, the `ServerComponent` will be loaded in place of `router-outlet` whenever the url corresponding to ServerComponent is hit on.

   ```html
   <!-- ServersComponent -->
   <div class="row">
     <div class="col-xs-12 col-sm-4">
       <div class="list-group">
         <a
           [routerLink]="['/servers', server.id]"
           class="list-group-item"
           *ngFor="let server of servers"
         >
           {{ server.name }}
         </a>
       </div>
     </div>
     <div class="col-xs-12 col-sm-4">
       <!-- <button class="btn btn-primary" (click)="onReload()">Reload Page</button>
    <app-edit-server></app-edit-server>
    <hr />
    <app-server></app-server> -->
       <router-outlet></router-outlet>
       <!-- ^ This is where ServerComponent will be loaded when the url changes to `/servers/:id   -->
     </div>
   </div>
   ```

### Lecture 141

1. Preserving queryParams: Default behavior of angular is to get rid of query params whenever navigating to a new route. To preserve the query params from current route, just set `queryParamsHandling` to `preserve` when navigating to a route programatically:

   ```ts
      editServer(): void {
       this.router.navigate(["edit"], {
         relativeTo: this.route,
         queryParamsHandling: "preserve",
       });
   }
   ```

   queryParamsHandling has also another value that can be set: `merge`. This will cause the current queryParams as well as newly set query params to show up.

   ```ts
   // from /view1?page=1 to/view2?page=1&otherKey=2
   this.router.navigate(["/view2"], {
     queryParams: { otherKey: 2 },
     queryParamsHandling: "merge",
   });
   //In case of a key collision between current parameters and those in the queryParams object, the new value is used.
   ```

### Lecture 142

1. Redirecting to a diff route: just specify the `redirectTo` property when declaring the new route.

   ```ts
   routes: Routes = [
     { path: "/users", component: UsersComponent },
     { path: "/blah", redirectTo: UsersComponent },
   ];
   ```

2. What to do in case the user enters a url unknown to our app?
   Here comes, wild card routes. Using a `**` tells angular: all routes that are not specified in our app.
   **Note that the order in which you specify routes in angular matter. If you put the wildcard route on top of all your routes, your app will always redirect to `/not-found`**

   ```ts
      { path: "not-found", component: PageNotFoundComponent },
      { path: "**", redirectTo: "/not-found" }, // or { path: "**", component: PageNotFoundComponent }
   ```

   **One more important note**
   By default, Angular matches paths by prefix. That means, that the following route will match both /recipes and just /

   `{ path: '', redirectTo: '/somewhere-else' } `

   Actually, Angular will give you an error here, because that's a common gotcha: This route will now ALWAYS redirect you! Why?

   Since the default matching strategy is "prefix" , Angular checks if the path you entered in the URL does start with the path specified in the route. Of course every path starts with '' (Important: That's no whitespace, it's simply "nothing").

   To fix this behavior, you need to change the matching strategy to "full" :

   `{ path: '', redirectTo: '/somewhere-else', pathMatch: 'full' } `

   Now, you only get redirected, if the full path is '' (so only if you got NO other content in your path in this example).

### Lecture 146

1. Guarding routes. What if you want to check if the current user has access to a route or not before showing them a specific page? Angular provides a convenient way of doing this.We can specify a guard by setting a `canActivate` property of a route

   ```ts
   // a route that we want to protect
    {
       path: "servers",
       component: ServersComponent,
       canActivate: [AuthGuard], //<- custom made
       children: [
         { path: ":id", component: ServerComponent },
         { path: ":id/edit", component: EditServerComponent },
       ],
     },
   ```

   ```ts
   //our guard will implement a `CanActivate` interface
   // don't forget to include me in the app module
   @Injectable()
   export class AuthGuard implements CanActivate {
     constructor(private authService: AuthService, private router: Router) {}

     canActivate(
       route: ActivatedRouteSnapshot,
       state: RouterStateSnapshot
     ): Observable<boolean> | Promise<boolean> | boolean {
       return this.authService
         .isAuthenticated()
         .then((authenticated: boolean) => {
           if (authenticated) {
             return true;
           } else {
             this.router.navigate(["/"]);
           }
         });
     }
   }
   ```

   ```ts
   // a mock custom auth service we made that is injected in our auth guard
   // don't forget to include me in the app module
   export class AuthService {
     loggedIn = false;

     isAuthenticated() {
       const promise = new Promise((resolve, reject) => {
         setTimeout(() => {
           resolve(this.loggedIn);
         }, 800);
       });

       return promise;
     }

     logIn() {
       this.loggedIn = true;
     }

     logOut() {
       this.loggedIn = false;
     }
   }
   ```

   After this, all routes with matching prefix `/servers` will be redirected to `/`

### Lecture 147

1. Can we implemnt guards for only child routes? Yes!

```ts
 // a route that we want to protect
  {
     path: "servers",
     component: ServersComponent,
     canActivateChild: [AuthGuard], //<- Your AuthGuard will have to implement `CanActivateChild` interface
     children: [
       { path: ":id", component: ServerComponent },
       { path: ":id/edit", component: EditServerComponent },
     ],
   },
```

### Lecture 149

1. `CanActivate` gives us the ability to check for access before rendering the view. What if we want to check access when a user wants to leave a view? For example let's say you have a form on your website the user can fill in. The user might fill in the form and without hitting 'submit' they try to move to a different URL. In this case, you might want to confirm with user if they really want to leave (since the 'submit' btn hasn't been clicked yet)

   This is where `canDeactivate` comes in.

2. confirm() <- a function provided by javascript that displays a modal dialog with an optional message and two buttons: OK and Cancel and returns a boolean

3. [ACTION ITEM]() Go through this lecture again

### Lecture 150

1. Passing static data to routes:

   ```ts
   routes: Routes = [
     {
       path: "/fruits",
       component: fruitsComponent,
       data: { message: "Some important data about fruits" }, //<- key value pairs
     },
   ];
   ```

   ```ts
   // in your component ts
   // route: ActivatedRoute
   this.route.data.subscribe((data) => {
     // do something with the data here
     console.log(data["message"]);
   });
   ```
