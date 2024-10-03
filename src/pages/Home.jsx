import React, { useEffect, useRef, useState } from 'react' 
import Card from '../components/Card';

function Home() {
    const [token] = useState(localStorage.getItem('token'));
    const [products, setProducts] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(true); 

    const nameRef = useRef();
    const priceRef = useRef();
    const descRef = useRef();
    const formRef = useRef();

    useEffect(() => {
        fetch('https://auth-rg69.onrender.com/api/products/private/all', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setProducts(data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false); 
            });
    }, [token]);

    function handleDelete(id) {
        let conf = confirm("Rostan ham o'chirmoqchimisiz?");
        if (conf) {
            fetch(`https://auth-rg69.onrender.com/api/products/private/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.message === "Mahsulot muvaffaqiyatli o'chirildi") {
                        let copied = [...products];
                        copied = copied.filter(cop => cop.id !== id);
                        setProducts(copied);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    function handleSave(event) {
        event.preventDefault();

        const create = {
            "name": nameRef.current.value,
            "description": descRef.current.value,
            "status": "active",
            "price": priceRef.current.value,
        };

        setDisabled(true);
        fetch('https://auth-rg69.onrender.com/api/products/private', {
            method: "POST",
            headers: {
                'Content-type': "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(create)
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.id) {
                    setProducts([...products, data]);
                    formRef.current.reset();
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setDisabled(false);
            });
    }

    return (
        <div>
            {loading ? (
                <div className="text-center mt-10">
                    <div className="loader"></div> 
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    <form ref={formRef} className='w-1/3 mt-10 flex flex-col bg-slate-400 p-3 rounded-md gap-4 mx-auto'>
                        <input ref={nameRef} className='p-2 rounded-md border' type="text" placeholder='Enter name...' />
                        <input ref={priceRef} className='p-2 rounded-md border' type="number" placeholder='Enter price...' />
                        <textarea ref={descRef} placeholder='Enter description...'></textarea>
                        <button onClick={handleSave} disabled={disabled} className='p-2 text-white border bg-blue-700 rounded-md'>
                            {disabled ? "LOADING..." : "CREATE"}
                        </button>
                    </form>

                    <div className='wrapper container mx-auto mt-10 flex flex-wrap gap-2 justify-center'>
                        {products.length > 0 && products.map(product => (
                            <Card delFunc={handleDelete} key={product.id} product={product}></Card>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
