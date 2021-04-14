// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {
    let country_capital_pairs = pairs;
    let question = Math.floor(Math.random() * (country_capital_pairs.length));
    document.getElementById('pr2__country').innerHTML = country_capital_pairs[question].country;
    document.getElementById("correct").value1=country_capital_pairs[question].capital;
    document.getElementById("correct").value2=country_capital_pairs[question].country;
    console.log(document.getElementById("correct").value1)
    console.log(document.getElementById("correct").value2)
    /*if (document.getElementById("pr2__capital").value.length>1){
        autocomplete(document.getElementById("pr2__capital").value, arr);
    }*/
    //document.getElementById('pr2__button').addEventListener('click', checkAnswer);
    const searchInput = document.querySelector('#pr2__capital');

    /*searchInput.addEventListener('keyup', function() {
        const input = searchInput.value;
        if (input.length>=2) {
            document.getElementById('options').innerHTML = '';
            var suggestions = arr.filter(function (capital) {
                if (capital.toUpperCase().startsWith(input.toUpperCase())) {
                    return capital;
                }
            });
            suggestions.forEach(function (suggested) {
                var div = document.createElement("OPTION");
                div.innerHTML = suggested;
                console.log(document.getElementById("options").innerHTML);
                document.getElementById('options').appendChild(div);
            });
        }
    })*/
    $("#modes").change(function(){
        if (document.getElementById("modes").value==="Right"){
            correct();
        }
        if (document.getElementById("modes").value==="Wrong"){
            wrong();
        }
        if (document.getElementById("modes").value==="All"){
            all();
        }
    });
    $( function() {
        const arr=[];
        for (let i=0;i<pairs.length;i++){
            arr.push(pairs[i].capital);
        }
        $("#pr2__capital").autocomplete({
            source: function (request, response) {
                var inp=request.term;
                var count=0;
                var ret=[]
                for (let i=0; i<arr.length; i++){
                    for(let j=0; j<inp.length; j++){
                        if(j>=arr[i].length){
                            count=0;
                            break;
                        }
                        if (inp[j].toUpperCase()===(arr[i][j].toUpperCase())){
                            count++
                        }
                    }
                    if (count===inp.length){
                        ret.push(arr[i]);
                    }
                    count=0;
                }
                response(ret);
            },
            minLength: 2,
            select: function (event, ui){
                event.preventDefault();
                document.getElementById('pr2__capital').value=ui.item.value;
                checkAnswer();
            }
        });
    });
    document.getElementById('pr2__capital').addEventListener('keypress', function(e){
        if(e.code === 'Enter'){
            e.preventDefault();
            checkAnswer();
            return true;
        }
  }, false);
});
$("modes").change(function(){
  alert("The text has been changed.");
});
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}
function correct(){
    var a = document.getElementById("mytable");
    var rights = a.childNodes;
    var count1=0;
    for(let i=0; i<rights.length;i++) {
        if (rights[i]) {
            if (rights[i].className === "wrong") {
                rights[i].style.display = "none";
            }
            if (rights[i].className === "right") {
                rights[i].style.display = "inline";
                count1++;
            }
        }
    }
    console.log(count1);

    if (count1===0){
        var elem = document.getElementById("empty_list");
        elem.style.display="unset";
    }
    else{
        var elem = document.getElementById("empty_list");
        elem.style.display="none";
    }

}
function wrong(){
    var a = document.getElementById("mytable");
    var rights = a.childNodes;
    var count1=0;
    for(let i=0; i<rights.length;i++) {
        if (rights[i]) {
            if (rights[i].className === "right") {
                rights[i].style.display = "none";
            }
            if (rights[i].className === "wrong") {
                rights[i].style.display = "inline";
                count1++;
            }
        }
    }
    if (count1===0){
        var elem = document.getElementById("empty_list");
        elem.style.display="unset";
    }
    else{
        var elem = document.getElementById("empty_list");
        elem.style.display="none";
    }
}
function all(){
    var a = document.getElementById("mytable");
    var rights = a.childNodes;
    var count1=0;
    for(let i=0; i<rights.length;i++) {
        if (rights[i]) {
            if (rights[i].className === "right") {
                rights[i].style.display = "block";
                count1++;
            }
            if (rights[i].className === "wrong") {
                rights[i].style.display = "block";
                count1++
            }
        }
    }
    if (count1===0){
        var elem = document.getElementById("empty_list");
        elem.style.display="block";
    }
    else{
        var elem = document.getElementById("empty_list");
        elem.style.display="none";
    }

}
function checkAnswer(newChild){
    if (document.getElementById("modes").value!=="All"){
        document.getElementById("modes").value="All";
        all();
    }
    if (document.getElementById('pr2__capital').value !=='') {
        if (document.contains(document.getElementById("empty_list"))){
            var elem = document.getElementById("empty_list");
            elem.style.display="none";
        }
        if (document.getElementById('pr2__capital').value.toUpperCase() === document.getElementById("correct").value1.toUpperCase()) {
            let x = document.createElement("tr");
            let a = document.createElement("td");
            let b = document.createElement("td");
            let c = document.createElement("td");
            x.appendChild(a);
            x.appendChild(b);
            x.appendChild(c);
            let corr_country = document.createTextNode(document.getElementById('correct').value2);
            let corr_capit = document.createTextNode(document.getElementById('correct').value1);
            let remove=document.createElement("BUTTON");
            remove.innerHTML="Remove";
            remove.setAttribute("type", "button");
            remove.addEventListener("click", function (){
                x.remove();
                return false;
            });
            a.appendChild(corr_country);
            b.appendChild(corr_capit);
            c.appendChild(remove);
            x.style.color="green";
            x.className="right";
            document.getElementById("mytable").appendChild(x);
        }
        else {
            var x = document.createElement("tr");
            var a = document.createElement("td");
            var b = document.createElement("td");
            var c = document.createElement("td");
            x.appendChild(a);
            x.appendChild(b);
            x.appendChild(c);
            let corr_country = document.createTextNode(document.getElementById('correct').value2);
            let corr_capit = document.createTextNode(document.getElementById('pr2__capital').value);
            let real_capit = document.createTextNode(document.getElementById('correct').value1)
            let remove=document.createElement("BUTTON");
            remove.innerHTML="Remove";
            remove.setAttribute("type", "button");
            remove.addEventListener("click", function (){
                x.remove();
                return false;
            });
            a.appendChild(corr_country);
            b.appendChild(corr_capit);
            c.appendChild(real_capit);
            c.appendChild(remove)
            b.style.textDecoration="line-through";
            c.style.fontStyle="italic";
            document.getElementById("mytable").appendChild(x);
            x.style.color="red";
            x.className="wrong";
        }
        document.getElementById('pr2__capital').value='';
        const suggestionsPanel = document.querySelector('.suggestions');
        suggestionsPanel.innerHTML = '';
        let country_capital_pairs = pairs;
        let question = Math.floor(Math.random() * (country_capital_pairs.length));
        document.getElementById('pr2__country').innerHTML = country_capital_pairs[question].country;
        document.getElementById('pr2__capital').value = '';
        document.getElementById("correct").value1 = country_capital_pairs[question].capital;
        document.getElementById("correct").value2 = country_capital_pairs[question].country;
        console.log(document.getElementById("correct").value1)
        console.log(document.getElementById("correct").value2)
        document.getElementById('pr2__capital').addEventListener('keypress', function (e) {
            if (e.code == 'Enter') {
                e.preventDefault();
                checkAnswer();
                return true;
            }
        }, false);
    }
    document.getElementById("pr2__capital").focus();
}
