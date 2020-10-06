import React,{Component} from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Auxi from "../Auxi/Auxi";

const withErrorHandler=(WrappedComponent,axios)=> {
    return class extends Component {
       state={
           error:null
       }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(request => 
                {this.setState({error:null})
                return request
                })
            this.resInterceptor = axios.interceptors.response.use(res=>res,error =>
                {this.setState({error:error})}
                )
        }
         componentWillUnmount(){
             console.log("willUnmount",this.reqInterceptor,this.resInterceptor);
           axios.interceptors.request.eject(this.reqInterceptor);
           axios.interceptors.response.eject(this.resInterceptor);
         }
        errorConfirmedHandler =()=>{
            this.setState({error:null})
        }
       render(){
        return(
            <Auxi>
            <Modal 
            modalClosed={this.errorConfirmedHandler} 
            show={this.state.error}> 
            {this.state.error? this.state.error.message:null}
            </Modal>
            <WrappedComponent {...this.props}/>
            </Auxi>
           )
       }
       
    }
}

export default withErrorHandler;
