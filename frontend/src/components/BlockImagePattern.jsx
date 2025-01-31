
// const BlockImagePattern = () => {
//     return (
//         <div className=" lg:flex items-center justify-center bg-base-200 p-12">
//             <div className="max-w-md text-center">
//                 <div className="grid grid-cols-3 gap-4 mb-8">
//                     {[...Array(9)].map((_, index) => (
//                         <div key={index} className={`aspecct-square rounded-full bg-primary/10 ${ index % 2 === 0 ? 'animate-pulse' : ''}`}/>
//                     ))}
//                 </div>
//                 <h2 className="text-3xl font-bold mb-4">Block Image Pattern</h2>
//                 <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, tempora!</p>
//             </div>

//         </div>
//     )
// }

// export default BlockImagePattern

// const BlockImagePattern = () => {
//     const boxes = Array(9).fill(null);

//     return (
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
//             {boxes.map((_, index) => (
//                 <div key={index} style={{ width: '100px', height: '100px', border: '1px solid black' }}></div>
//             ))}
//         </div>
//     );
// };

// export default BlockImagePattern;