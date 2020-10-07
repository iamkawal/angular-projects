# Learnings from Angular: the complete guide

## Section 11

### Lecture 129

1. To apply a css class on a `<a></a>` tag, whenever the routerLink corresponding to that `<a></a>` gets hit, use the directive `routerLinkActive`. For example:
   `<li routerLinkActive="active"> <a routerLink="/">Home</a> </li>`
   Whenever the app hits `/` route, a css class "active" will be put on this list item.

2. Consider the following scenario: Your app has three anchor tags inside list items:
   "/", "/users", "/servers"
   If you set `routerLinkActive="active"` on all of these three, whenever you hit `/users`, the css class "active" will be set on `/` as well. (same scenario with `/servers`). The reason is that, by default, `routerLinkActive` applies css classes, if a route is part of the current route.

   another ex: let's say links are `/`, `/user` and `/user/bob` and `routerLinkActive="blah"` is set for all three of them. Css class will be applied to `/user/bob` , `/user` and `/`

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
      //whenever we hit any url like /users/1/kawal we expect to see:
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
       this.currentRoute.params.subscribe((params: Params) => {
         this.user = {
           id: params["id"],
           name: params["name"],
         };
       });
      }
   ```
