 
 import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const CyberExpertApp = () => {
  const [experts, setExperts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/experts.json")
      .then((res) => res.json())
      .then((data) => setExperts(data));
  }, []);

  const addToCart = (expert) => {
    const exists = cart.find((item) => item.id === expert.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === expert.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...expert, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalSalary = cart.reduce(
    (total, item) => total + item.salary * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
       {/* Top Heading Section */}
      <div className="bg-[bisque] p-6 rounded mb-8 text-center">
        <h1 className="text-4xl font-bold text-red-700 mb-2">
          Make a Cyber Security Team
        </h1>
        <p className="text-lg text-black mb-1 ">
          Our server is under attack, so we need to hire a special cyber security team.
        </p>
        <p className="text-2xl font-bold text-gray-900 ">
          Total Budget: <span className="text-green-700">$10 Million</span>
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Expert List */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 bg-pink-300 hover:bg-blue-300 cursor-pointer rounded-sm px-1 py-1 inline-block">Available Experts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> 
            {experts.map((expert) => (
              <div key={expert.id} className="bg-white p-4 rounded shadow">
                <img
                  src={expert.img}
                  alt={expert.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h3 className="font-semibold mb-2"> <span className="bg-blue-200 px-0.5  rounded-sm">Name: </span>{expert.name}</h3>
                <h3 className="font-semibold mb-2"> <span className="bg-emerald-200 px-0.5  rounded-sm">Age: </span>{expert.age}</h3>
                <p className=" font-semibold"><span className=" bg-amber-200 px-0.5 rounded-sm ">Designation: </span>{expert.designation}</p>
                <p className=" font-semibold"><span className="bg-sky-200 px-0.5 rounded-sm ">Address: </span>{expert.address}</p>
                <p className="text-sm font-bold mt-2"> 
                  Salary: ${expert.salary}
                </p>
                <button
                  onClick={() => addToCart(expert)}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                  Add to List
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="bg-gray-100 p-6 rounded shadow h-fit">
          <h2 className="text-2xl font-bold mb-4 text-center">Selected Experts</h2>
          {cart.length > 0 ? (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white p-3 rounded"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${(item.salary * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)}>
                    <Trash2 />
                  </button>
                </div>
              ))}
              <div className="mt-4 font-bold text-lg text-center">
                Total Salary: ${totalSalary.toFixed(2)}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">No experts selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CyberExpertApp;

 