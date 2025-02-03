Goto https://www.fs.usda.gov/nrs/atlas/tree/

Fetch list with:
```
Array.prototype.map.call(document.querySelectorAll('#trees_wrapper a'), function(e){
    return e.href;
});
```
