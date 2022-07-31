import React, { Component } from 'react';
import { 
    FormGroup,
    Form,
    Input,
    Label,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Accordion,
    AccordionBody, 
    AccordionHeader, 
    AccordionItem,
    Fade,
    Table
} from 'reactstrap';
import Scanner from './Scanner';
import 'bootstrap/dist/css/bootstrap.css';


class TPRForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            "barcodeResult" : 0,
            "barcodeScannerEnabled": false,
            "formData" : {
                "name" : "",
                "upc" : "",
                "date" : "",
                "quantity" : ""
            },
            "inputStates" : {
                "nameIsValid" : false,
                "upcIsValid" : false,
                "dateIsValid" : false,
                "quantityIsValid" : false
            }
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleBarcodeDetect = this.handleBarcodeDetect.bind(this);
        this.enableBarcodeScanner = this.enableBarcodeScanner.bind(this);
        this.handleBarcodeReaderCancel = this.handleBarcodeReaderCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleBarcodeDetect(value) {
        this.setState({ barcodeResult : value });
        this.setState({ barcodeScannerEnabled : false });
        this.setState({
            formData : {
                ...this.state.formData,
                upc : value
            }
        });
        console.log(this.state);
    }
    
    handleBarcodeReaderCancel(){
        this.setState({ barcodeScannerEnabled : false });
    }
    
    enableBarcodeScanner(){
        this.setState({ barcodeScannerEnabled : true });
    }
    
    handleFormSubmit(event){
        event.preventDefault();
        console.log(event.target.elements);
        let formArray = {...this.state.formData};
        for (let i = 0; i < event.target.elements.length; i++){
            let element = event.target.elements[i];
            if (element.type !== "submit"){
                let name = element.name;
                let value = element.value;
                console.log(name);
                console.log(value);
                formArray[name] = value;
            }
        }
        this.setState({
            formData:formArray
        });
        console.log(formArray);
        console.log(this.state);
        this.props.updateFormData(this.state.formData);
    }
    
    handleInputChange(event){
        let value = event.target.value;
        this.setState({
            formData : {
                ...this.state.formData,
                [event.target.name] : value
            }
        });
    }
    
    render(){
        return(
            <Form inline onSubmit={this.handleFormSubmit}>
                <FormGroup floating>
                    <Input
                        id="nameInput"
                        name="name"
                        placeholder="Product Name"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.formData.name}
                    />
                    <Label for="nameInput">
                        Product Name
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="upcInput"
                        name="upc"
                        placeholder="Product UPC"
                        type="number"
                        onChange={this.handleInputChange}
                        value={this.state.formData.upc}
                    />
                    <Label for="upcInput">
                        UPC
                    </Label>
                    <Button onClick={this.enableBarcodeScanner}>Use Scanner</Button>
                    {
                        this.state.barcodeScannerEnabled ? (
                            <Fade>
                                <Scanner onChange={this.handleBarcodeDetect} onCancel={this.handleBarcodeReaderCancel}/>
                            </Fade>
                        ) : null
                    }
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="dateInput"
                        name="date"
                        placeholder="Expiration Date"
                        type="date"
                        onChange={this.handleInputChange}
                        value={this.state.formData.date}
                    />
                    <Label for="dateInput">
                        Expiration Date
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="quantityInput"
                        name="quantity"
                        placeholder="Quantity"
                        type="number"
                        onChange={this.handleInputChange}
                        value={this.state.formData.quantity}
                    />
                    <Label for="quantityInput">
                        Number of Items
                    </Label>
                </FormGroup>
                <Button type="submit" color="primary">
                    Submit
                </Button>
            </Form>      
        );
    }
}


class TPRList extends Component{
    constructor(props){
        super(props);
        
        /* FUCK THIS JSXIFY BULLSHIT */
//        this.JSXifyData = this.JSXifyData.bind(this);
    }
    
//    JSXifyData(){
//        let data = this.props.data;
//        console.log(data);
//        let JSXToBeRendered = React.element;
//        for (let i = 0; i<data.length; i++){
//            console.log(data[i]);
//            JSXToBeRendered += <tr><td scope="row">{data[i].name}</td><th>{data[i].upc}</th><td>{data[i].date}</td><td>{data[i].quantity}</td></tr>
//        }
//        console.log(JSXToBeRendered);
//        return(JSXToBeRendered);
//    }
    
    render(){
        return(
            <Table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            UPC
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            Quantity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map(
                        d => (
                            <tr>
                                <td>{d.name}</td>
                                <td>{d.upc}</td>
                                <td>{d.date}</td>
                                <td>{d.quantity}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        );
    }
}


class Automator extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTprList : [],
            modalIsOpen: false
        };
        this.handleFormComplete = this.handleFormComplete.bind(this);
        this.toggleFormModal = this.toggleFormModal.bind(this);
    }
    
    handleFormComplete(formData){
        this.setState({
            currentTprList: this.state.currentTprList.concat(formData)
        });
    }
    
    toggleFormModal(){
        this.setState({
            modalIsOpen : !this.state.modalIsOpen
        });
    }
    
    render(){
        return (
        <div>
            <div className="App">
              <Button color="primary" onClick={this.toggleFormModal}>+</Button>
              <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleFormModal}>
                  <ModalHeader toggle={this.toggleFormModal}>Add new TPR...</ModalHeader>
                  <ModalBody>
                      <TPRForm updateFormData={this.handleFormComplete}/>
                  </ModalBody>
              </Modal>
            </div>
            <div>
                <TPRList data={this.state.currentTprList}/>
            </div>
        </div>
        );
    }
}

/*
 * JSX SCANNER ELEMENT
 * Automator Class
            <Scanner onChange={this.handleBarcodeDetect}/>
            {this.state.barcodeResult}
 */

/*
    <TPRForm updateFormData={this.handleFormComplete}/>
*/

export default Automator;