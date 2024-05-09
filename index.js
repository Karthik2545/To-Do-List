const list={
    items:[]
};

const card=document.querySelector(".newcard");
const card1=document.querySelector(".newcard1");
const addreminder=({id,title,time})=>`
    <div>
        <div class="card mt-2" style="width: 18rem;background-color: whitesmoke;height: 150px;padding: 5px;" id=${id} key=${id}>
            <div class="but">
                <div class='card-header d-flex gap-2 justify-content-end task__card__header'>
                    <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="deleteTask.apply(this, arguments)">
                    <i class='fas fa-trash-alt'></i></button>
                </div>
            </div>    
            <div class="card-body">
                <div class="card-items">
                    <i class="fa-solid fa-feather-pointed"></i>
                    <h5 class="card-title">${title}</h5>
                </div>
                <div class="card-items">
                    <i class="fa-solid fa-bell"></i>
                    <h5>${time}</h5>
                </div>
            </div>
        </div>
    </div>
  `
  const add=({id,title,time})=>`
                    <div class="card mt-2" style="width: 18rem;background-color: whitesmoke;height: 200px;padding: 5px;" id=${id} key=${id}>  
                        <div class="card-body">
                            <div class="card-items">
                                <i class="fa-solid fa-feather-pointed"></i>
                                <h5 class="card-title">${title}</h5>
                            </div>
                            <div class="card-items">
                                <i class="fa-solid fa-bell"></i>
                                <h5>${time}</h5>
                            </div>
                        </div>
                    </div>`

const openTask=(e)=>{
    const tid =e.target.getAttribute("name");
    const mydata=JSON.parse(localStorage.getItem("data"));
    mydata.keys.map((numbers)=>{
            if(numbers.id===tid){
                card1.insertAdjacentHTML("beforeend",add({...numbers,tid}));
                
            }
        })
    }

const deleteTask=(e)=>{
    const tid =e.target.getAttribute("name");

    const mydata=JSON.parse(localStorage.getItem("data"));
    mydata.keys.map((values)=>{
        if (values.id===tid){
            list.items.pop(values);
            e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
            updlocalStorage();
        }
    })
}

const updlocalStorage=()=>{
    localStorage.setItem('data',JSON.stringify({keys:list.items}));
};

const load = () => {
    const localStorageCopy = JSON.parse(localStorage.data);

    if(localStorageCopy) list.items = localStorageCopy.keys;
    list.items.map((cardDate) => {
        card.insertAdjacentHTML("beforeend", addreminder(cardDate));
     });
};

const clicksubmit=()=>{
    var id=Date.now();
    id=id.toString();
    const input={
        title:document.getElementById("title").value,
        time:document.getElementById("time").value,
    }

    list.items.push({...input,id});
    updlocalStorage();
    card.insertAdjacentHTML("beforeend",addreminder({...input,id}));

}
