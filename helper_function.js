/**
 * https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_list
 *  
 */

function sortList(list, type) {
    var list, i, switching, b, shouldSwitch;
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("LI");
      // Loop through all list-items:
      for (i = 0; i < (b.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* check if the next item should
        switch place with the current item: */

        if(type == 'sort_by_title'){

            if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                /* if next item is alphabetically
                lower than current item, mark as a switch
                and break the loop: */
                shouldSwitch = true;
                break;
              }

        }else if(type == 'sort_by_likely-date'){
           
            if(b[i].getAttribute('likely-date') > b[i+1].getAttribute('likely-date')){
                
                shouldSwitch = true;
                break;
            }
        }
        
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }

    return list;
}

/**
 *  https://codeburst.io/javascript-array-distinct-5edc93501dc4
 */
const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
}
