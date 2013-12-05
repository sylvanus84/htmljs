htmljs
======

create html with pure js

Examples:
```javascript
with(domJS) {
  div(
    accounts.map(function(account){
		  return tr(
				input(account.id), 
				type(account.button),
				account.datas.map(function(data){
          return input(
            type(data.type)
        }))
		});
	)
}

with(domJS) {
	div(
		accounts.map(function(account){
			return tr(
				input(account.id), 
				type(account.button),
		});
	);
	
	div(
		tr-map(
      accounts,
      {
        type : "type",
        src : "gaer",
      },
      td-map(
      
      )
	);
}
```
