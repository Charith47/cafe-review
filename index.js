const cafeList = document.getElementById('review-list');
var getDB = true;
menu();

function toggle() {
    if (getDB == true) {
        getDB = false;
        menu();  
    }
    else {
        getDB = true;
        menu();
    }
}

function menu() {
    console.log(getDB);
    if (getDB == true) {
        var tab_1 = document.getElementById('read-review');
        tab_1.classList.add('active');
        getData();
    } 
    else {
        document.getElementById('review-list').innerHTML = '';
        addReview();
    } 
}

function renderReview(doc) {
    setReview(doc.id,doc.data().rating*20);

    let revBody = document.createElement('div');
    let ulist = document.createElement('ul');
    let cname = document.createElement('li');
    let crating = document.createElement('li');
    let creview = document.createElement('li');

    revBody.classList.add('review-body');
    cname.classList.add('c-name');
    creview.classList.add('c-review');

    ulist.setAttribute('data-id', doc.id);
    crating.setAttribute('id', doc.id);
    cname.textContent = doc.data().name + " | " + doc.data().location ;
    crating.textContent = "⭐⭐⭐⭐⭐";
    creview.textContent = doc.data().review;

    ulist.appendChild(cname);
    ulist.appendChild(crating);
    ulist.appendChild(creview);


    revBody.appendChild(ulist);
    cafeList.appendChild(revBody);
}

function setReview(ID, score) {
    var style = document.createElement('style');
    style.innerHTML = "#" + ID + "{width: fit-content;background: linear-gradient(90deg, rgb(255, 187, 0) " + score + "%, rgb(46, 45, 45) " + score + "%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;}"
    var ref = document.querySelector('script');
    ref.parentNode.insertBefore(style, ref);
}

function scale(num){
    return (num) * 20;
}

function getData() {
   db.collection("reviews")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            renderReview(doc);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    }); 
}

function addReview() {
    console.log("adding review...")
}