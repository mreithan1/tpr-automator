import React, { Component, useEffect } from 'react';
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
    Table,
    Spinner,
    Toast,
    ToastHeader,
    ToastBody,
    Alert
} from 'reactstrap';
import { CSVDownload, CSVLink } from "react-csv";
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
    }
    
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


function DownloadLink(props){
    const csvLink = React.useRef();
    
    useEffect(() => {
        csvLink.current.link.click();
    }, [])
    return(
        <CSVLink
            data={props.data}
            headers={props.headers}
            filename={props.filename}
            ref={csvLink}
        />
    );
}


class DownloadComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            downloadIsOpen: false,
            downloadIsReady: false,
            fileName: "",
            disableDownloadButton: false,
            toastIsOpen: false,
            filenameIsValid: false
        };
        this.headers = [
            { label: "Product Name", key: "name" },
            { label: "Product Code", key: "upc" },
            { label: "Expiration Date", key: "date" },
            { label: "Quantity", key: "quantity" }
        ];
        this.currentDate = new Date();
        this.date = `${this.currentDate.getMonth()+1}_${this.currentDate.getDate()}_${this.currentDate.getFullYear()}`;
        
        this.data = this.props.data;
        
        this.toggleDownloadToast = this.toggleDownloadToast.bind(this);
        this.updateFilename = this.updateFilename.bind(this);
        this.initDownload = this.initDownload.bind(this);
    }
    
    componentDidMount(){
        this.setState({
            fileName: `${this.date}_tprExport.csv`
        });
    }
    
    toggleDownloadToast(){
        this.setState({
            downloadIsOpen: !this.state.downloadIsOpen,
            disableDownloadButton: !this.state.downloadIsOpen
        });
        this.props.onToggle();
    }
    
    updateFilename(event){
        let value = event.target.value;
        this.setState({
            fileName : value
        });
        
    }
    
    appendCSVExtension(){
        let newFileName = this.state.fileName + ".csv"
            this.setState({
                fileName: newFileName
            });
    }
    
    initDownload(){
        if (!this.state.fileName.endsWith(".csv")){
            this.appendCSVExtension();
        }
        this.setState({
            downloadIsReady: true
        });
//        setTimeout(()=>{this.setState({downloadIsReady:false});}, 1000)
        console.log("Downloading file as " + this.state.fileName);
        setTimeout(()=>{this.toggleDownloadToast();}, 100);
    }
    
    download(){
        if (this.state.downloadIsReady){
            this.setState({
                downloadIsReady: false
            });
            return true;
        } else {
            return false;
        }
    }
    
    render(){
        return(
            <div>
                <Button color="success" onClick={this.toggleDownloadToast} disabled={this.state.disableDownloadButton}>
                    Download { this.state.disableDownloadButton ? (<Spinner/>) : null}
                </Button>
                { this.state.downloadIsOpen ? (
                    <Toast isOpen={this.state.downloadIsOpen}>
                        <ToastHeader toggle={this.toggleDownloadToast}>Download as CSV</ToastHeader>
                        <ToastBody>
                            <Form>
                                <Alert color="danger" hidden={this.state.fileName.length ? (true):(false)}>Filename cannot be blank</Alert>
                                <FormGroup floating>
                                    <Input
                                        id="filenameInput"
                                        name="fileName"
                                        placeholder="Filename"
                                        type="text"
                                        onChange={this.updateFilename}
                                        value={this.state.fileName}
                                    />
                                    <Label for="filenameInput">Filename</Label>
                                </FormGroup>
                                <Button onClick={this.initDownload} disabled={!this.state.fileName.length ? (true):(false)}>Download</Button>
                            </Form>
                            {
                                this.download() ? (
                                    <DownloadLink data={this.data} headers={this.headers} filename={this.state.fileName}/>
                                ) : null
                            }
                        </ToastBody>
                    </Toast>
                ):null}
            </div>
        );
    }
    
}


class Automator extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTprList : [],
            modalIsOpen: false,
            downloadManagerIsOpen: false
        };
        this.handleFormComplete = this.handleFormComplete.bind(this);
        this.toggleFormModal = this.toggleFormModal.bind(this);
        this.isData = this.isData.bind(this);
        this.toggleDownloadManager = this.toggleDownloadManager.bind(this);
    }
    
    handleFormComplete(formData){
        this.setState({
            currentTprList: this.state.currentTprList.concat(formData)
        });
        this.setState({
            modalIsOpen : false
        });
    }
    
    toggleFormModal(){
        this.setState({
            modalIsOpen : !this.state.modalIsOpen
        });
    }
    
    toggleDownloadManager(){
        this.setState({
            downloadManagerIsOpen: !this.state.downloadManagerIsOpen
        });
    }
    
    isData(){
        if (this.state.currentTprList.length <= 0){
            return false;
        } else {
            return true;
        }
//        return(true); // DEVELOPER
    }
    
    render(){
        return (
        <div>
            <div className="App">
              <Button color="primary" onClick={this.toggleFormModal} disabled={this.state.downloadManagerIsOpen}>New</Button>
              {
                    this.isData() ? (
                        <DownloadComponent data={this.state.currentTprList} onToggle={this.toggleDownloadManager}/>
                    ) : null
                }
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