// import React, { Component } from 'react';

// export class MiniAttribute extends Component {
//   constructor(props) {
//     super(props)
//     this.state={

//     }
//     this.chooseValue=this.chooseValue.bind(this);
//     this.chooseColor=this.chooseColor.bind(this);
//     this.updateInfo=this.updateInfo.bind(this);
//   }
//   chooseValue(text, attributeName) {

//     let color;
//     let backgroundColor;
//     let pointerEvent;
//     if (this.props.itemInfo[attributeName]===text) {
//       color='white';
//       backgroundColor="#1D1F22";
//     } else {
//       color='black';
//       backgroundColor="white";
//     }
//     // color!=='#A6A6A6'? is the same condition as this.state.notAvailable!==text?
//     const style={height:"24px", minWidth:"24px",marginRight:"8px", display:"flex", justifyContent:"center",
//       border:`1px solid ${color==='#A6A6A6'? '#A6A6A6': "#1D1F22"}`, fontFamily:"Source Sans Pro",
//       fontSize:"14px",alignItems:"center" , PointerEvents:`${pointerEvent}`, lineHeight:"160%", fontWeight:"400",
//       marginTop:"5px",
//       color:`${color}`,  backgroundColor:`${backgroundColor}`,
//       boxSizing:"border-box", cursor:`${color!=='#A6A6A6'? "pointer": null}`}

//     return <div key={text} style={style} onClick={() =>this.updateInfo(text, attributeName)  }>
//       {text}
//     </div>

//   }
//   chooseColor(color,attributeName){

//     let chosen = this.props.itemInfo[attributeName]=== color? true: false;
//     const style={height:"24px", minWidth:"24px",marginRight:"8px", display:"flex", justifyContent:"center",
//       border:`2px solid ${chosen? "#1D1F22":'#A6A6A6' }`, fontFamily:"Source Sans Pro",
//       fontSize:"14px",alignItems:"center" , lineHeight:"160%", fontWeight:"400",
//       color:`${color}`,
//       marginTop:"5px", backgroundColor:`${color}`,
//       boxSizing:"border-box", cursor: "pointer"}
//     return <div key={color} style={style} onClick={() =>this.updateInfo(color, attributeName) }></div>
//   }
//   updateInfo(value, attributeName){
//     this.props.UpdateItem(this.props.itemInfo.id, attributeName, value );
//   }
//   componentDidMount(){

//     // this.props.attributes.map(atb=> {
//     //   const {name}=atb;
//     //   this.setState(st=>{return {...st, name} })
//     //   return null;
//     // })
//     if(this.props.itemInfo) {
//       const {itemInfo}=this.props;
//       this.setState(()=>{return {...itemInfo }})
//     }

//   }
//   render() {
//     const {attributes,} =this.props;

//     let newItemInfo=this.state;
//     delete newItemInfo.chosenImgUrl;
//     delete newItemInfo.notAvailable;
//     return (
//       <div>
//         {attributes.map(attribute=>{
//           // draws mini attributes
//           if(attribute.type==="text") {

//             return (
//               <div>
//                 <div style={{display:"flex"}}>
//                   {attribute.items.map( item=>(this.chooseValue(item.value,attribute.name )))}
//                 </div>
//               </div>
//             )
//           } else if(attribute.type==="swatch") {
//             return (<div>
//                 <div style={{display:"flex"}}>
//                   {attribute.items.map( item=> (this.chooseColor(item.value,attribute.name)) )}
//                 </div>
//               </div>
//             )

//           }
//           return null;
//         })}

//       </div>
//     )
//   }
// }

// export default MiniAttribute;
