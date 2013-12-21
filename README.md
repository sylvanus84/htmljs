htmljs
======

Tiny tool to create html fragments with pure javascript. It is like a pure javascript 'template-engine'.

Examples:

```javascript
with(htmlJs) {
  div({ class : "content" }, "Context");
}

//returns the DIV as HTMLElement:

<div class="content">Context</div>
```

In htmlJS object there's a constructor function for every standard HTML tag. This can be very handy in many cases:

```javascript

function accountsTemplate(accounts) {
  with(domJS) {
    return div({id : "accounts"},
      accounts.map(function(account){
        return tr({class : "account-row"},
          td({class : "account"},
            input({ type : "text" }, account.name)
          )
        );
      }
    )
  }
}
```

The first parameter is the attributes object, it is optional. All the remaining parameters will be the children of the element.

I know using 'with' is uncomfortable, I'm working on getting rid of it.

Checkout the example in 'example.html'.
