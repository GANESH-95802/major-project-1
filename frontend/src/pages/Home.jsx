import {Link} from "react-router-dom";


function Home(){

return(

<section className="hero">

<div>

<h1>
Shop Smarter
</h1>

<p>
Premium online shopping experience
</p>


<Link className="btn btn-light"
to="/products">

Explore

</Link>


</div>


</section>

)

}

export default Home;