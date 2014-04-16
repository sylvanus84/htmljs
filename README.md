htmljs
======

Tiny tool to create html fragments with pure javascript. It is like a pure javascript 'template-engine'.

Examples:

```javascript
with(htmlJs) {
  div({ class : "content" }, "Content");
}

//returns the DIV as HTMLElement:

<div class="content">Content</div>
```

In htmlJS object there's a constructor function for every standard HTML tag. This can be very handy in many cases:

```javascript

function accountsTemplate(accounts) {
  with(htmlJs) {
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

Check out the example in 'example.html'.

Comparison with another templating engine:

```
<template name="Products">
    {{#each ProductArr}}
        <div class="Product">
            <h2>{{Name}}</h2>
            <p>Price: ${{Price}}</p>
            {{#if this.InStock}}
                <p>This Item is in stock</p>
            {{else}}
                <p>This Item is currently sold out</p>
            {{/if}}
        </div>
    {{/each}}
</template>

<template name="Cart">
    <div id="Cart">
        <table>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
            {{#each CartItems}}
                <tr>
                    <td>{{Name}}</td>
                    <td>${{Price}}</td>
                    <td>{{Quantity}}</td>
                    <td>${{Total}}</td>
                </tr>
            {{/each}}
            <tr>
                <td colspan="4">Total: ${{SubTotal}}</td>
            </tr>
    </div>
</template>
```

The same with htmljs:

```
function products(productArr) {
    productArr.map(function(product) {
        div({ class: "Product"},
            h2(product.Name),
            p("Price: " + product.Price),
            p("This item is " + product.inStock ? "in stock" : "currently sold out"))})    
}

function cart(CartItems) {
    div({ id: "Cart" },
        table(
            tr(
                ["Name, Price, Quantity, Total"].map(th)),
            CartItems.map(function(Item) {
                tr(
                    [Item.Name, "$" + Item.Price, Item.Quantity, "$" + Item.Total].map(td))}),
            tr(
                td({ colspan: "4"},
                    "Total: $" + subTotal))))
}
```
