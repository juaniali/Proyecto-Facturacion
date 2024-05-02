const burguer = document.querySelector(".Burguer");

const navBarLinks = document.querySelector(".navbar-links");

burguer.addEventListener("click", () =>{
    navBarLinks.classList.toggle("active");
})

