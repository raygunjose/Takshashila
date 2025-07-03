import {useState} from 'react';
import './App.css';

function App() {
  //Variables
  const [products, setProducts] = useState([]);
  const [form, setFrom] = useState({name:"", price:"", description:""});
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  
  //Functions
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(isEdit)
    {
      //Edit
      const updated = [...products];
      updated[editIndex] = form;
      setProducts(updated);
      setIsEdit(false);
      setEditIndex(null);
    }
    else
    {
      setProducts([...products, form]);
    }
    setFrom({name:"", price:"", description:""})
  }

  const handleChange = (e)=>{
    setFrom({ ...form, [e.target.name]: e.target.value});
  }

  const handleDelete = (index)=>{
    const willDelete = window.confirm("Are you sure? not recoverable after delete");
    if(willDelete)
    {
      const updated = [...products];
      updated.splice(index, 1);
      setProducts(updated);
    }
  }

  const handleEdit = (index)=>{
    setFrom(products[index]);
    setIsEdit(true);
    setEditIndex(index);
  }

  //UI
  return(
    <div className="container">
      <h2>Product Manage</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input 
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input 
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEdit? 'Update' : 'Add'} Product</button>
      </form>

      <hr/>

      <ul>
        {products.map((product, index)=>{
          return(
            <li key={index} className='product-item'>
              <strong>{product.name}</strong> - Rs. {product.price}/-<br />
              <small>{product.description}</small><br />
              <button onClick={()=>handleDelete(index)}>Delete</button>
              <button onClick={()=>handleEdit(index)}>Edit</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;