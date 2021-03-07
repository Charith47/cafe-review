const cafeList = document.getElementById('review-list');
const reviewList = document.getElementById('review-list');
const ratingMenu = document.getElementById('rating-menu');
const ratingValues = document.getElementById('rating-values');
const form = document.getElementById('input-form');
init();

function init() {
    reviewList.innerHTML = '';
    reviewList.style.display = 'none';
    ratingMenu.style.display = 'block';
    console.log("toggled");
    toggle('r');
   // getData();
}

function toggle(state) {

    switch (state) {
        case 'r':
            // remove rating menu display: none;
            // render review list (get new data)
            ratingMenu.style.display = 'none';
            reviewList.style.display = 'block';
            getData();
            console.log(state);
            break;
        case 'a':
            // remove review list (innerHTML = '';) && display: none;
            // render rating menu;
            reviewList.innerHTML = '';
            ratingValues.innerHTML = '';
            reviewList.style.display = 'none';
            ratingMenu.style.display = 'block';
            console.log(state);
            break;
        default:
            // do absolutely nothing
            break;
    }

}

function renderReview(doc) {
    
    setReview(doc.id,doc.data().rating*20);
    let delBtn = document.createElement('div');
    let revBody = document.createElement('div');
    let ulist = document.createElement('ul');
    let cname = document.createElement('li');
    let crating = document.createElement('li');
    let creview = document.createElement('li');

    revBody.classList.add('review-body');
    revBody.setAttribute('del-key', doc.id);
    cname.classList.add('c-name');
    creview.classList.add('c-review');
    delBtn.classList.add('del-btn');

    delBtn.textContent = "×";

    ulist.setAttribute('data-id', doc.id);
    crating.setAttribute('id', doc.id);
    cname.textContent = doc.data().name + " | " + doc.data().location ;
    crating.textContent = "⭐⭐⭐⭐⭐";
    creview.textContent = doc.data().review;

    ulist.appendChild(cname);
    ulist.appendChild(crating);
    ulist.appendChild(creview);
    ulist.appendChild(delBtn);

    revBody.appendChild(ulist);
    cafeList.appendChild(revBody);

    //del method
    delBtn.addEventListener('click', e => {
        e.stopPropagation();
        let id = e.target.parentNode.getAttribute('data-id');
        console.log('Doc ' + id + ' was deleted!');
        db.collection('reviews').doc(id).delete();
        document.querySelector(id).innerHTML = '';
    })
}

function setReview(ID, score) {
    var style = document.createElement('style');
    var pos = document.getElementById('rating-values');
    style.innerHTML = "#" + ID + "{width: fit-content;background: linear-gradient(90deg, rgb(255, 187, 0) " + score + "%, rgb(46, 45, 45) " + score + "%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;}"
    pos.appendChild(style);
    var ref = document.querySelector('script');
    ref.parentNode.insertBefore(pos, ref);
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

document.addEventListener('submit', (e) => {
    let ratingValue = getRating();

    e.preventDefault();

    console.log("Submitted!")
    db.collection('reviews')
        .add(
            {
                name: form.cafeName.value,
                rating: ratingValue,
                location: form.cafeLocation.value,
                review: form.cafeReview.value
            }
        );
        
    form.cafeName.value = '';
    form.cafeLocation.value = '';
    form.cafeReview.value = '';

});

function getRating() {
    const elems = document.querySelectorAll('.rstar');
    console.log('hello');
    for (let i = 0; i < elems.length; i++) {
        if (elems[i].checked) {
            elems[i].checked = false;
            return elems[i].value
        }
    }
}
