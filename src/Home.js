import { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';


const AccordionPage = (props) => {
    const [accordionOpen, accordionSetOpen] = useState('0');
    const toggle = (id) => {
        accordionOpen === id ? accordionSetOpen() : accordionSetOpen(id);
    };
    
    return (
            <div>
                <Accordion open={accordionOpen} toggle={toggle}>
                    <AccordionItem>
                        <AccordionHeader targetId="1">
                            Introduction
                        </AccordionHeader>
                        <AccordionBody accordionId="1">
                            <strong>Why was this app built?<br/></strong>
                            I saw there was an efficiency issue with the way 
                            Ray's Food Place documents their products for TPR:
                            Using a pen and paper to write down UPC codes,
                            dates, names, and quantities seemed quite slow as is the 
                            process for translating that into the database for 
                            creating the TPR. This application was built to streamline 
                            the process of creating TPR  reference data by 
                            eliminating the need to write down the names or UPC 
                            of a product with the simple use of a mobile phone's 
                            camera, however, 
                            dates and quantities must be manually added. This 
                            Application also eliminates the need to manually 
                            type in TPR data and, instead, converts data into 
                            a well formatted, easy to process, spreadsheet file 
                            that can be easily emailed to the product manager to be copied and pasted, 
                            saved for future reference, or uploaded to an additional 
                            database for further processing. 
                            
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="2">
                            Security
                        </AccordionHeader>
                        <AccordionBody accordionId="2">
                            <strong>Is this app secure?<br/></strong>
                            All data provided, including data handled from the camera, is securely 
                            encrypted using GitHub's "pages" TLS (SSL) encryption -- even I cannot see 
                            the key. In addition, most -- if not all -- data handled is entirely client-
                            side; this means that once the app is loaded in your browser, all data is not 
                            transferred over the internet and is housed entirely within your browser app 
                            (with the exception of the download service, downloading data from the website 
                            can expose you to a MitM attack if the attacker is able to breach the SSL encryption).
                            <br />
                            <strong>Is it possible for the camera to "spy" on me?</strong><br/>
                            The barcode scanner widget is stored within a library called Quagga. 
                            Not only with security and trust in mind, I also developed my calls for 
                            Quagga to be performance conscious. The only time the camera is active is when 
                            the Scanner.js component is rendered in the browser and when it is terminated, 
                            a function within the Scanner component (destroyVideo()) executes to not only 
                            run Quagga.stop() disabling camera access but also to set the video element to 
                            a null return instead (with the help of "doVideoRender?"); setting the element as null gives Quagga nothing to 
                            render into thus throwing an error and completely halting the program resulting in  
                            disabling the camera. In addition, modern web browsers have security policies in place to prevent such a thing, 
                            when the browser is closed: permissions are revoked.<br/>All my source code is availible for review on github as well as in the sources tab of the developer console.
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="3">
                            Program Info
                        </AccordionHeader>
                        <AccordionBody accordionId="3">
                            Framework: ReactJS<br/>
                            Server: Github Pages<br/>
                            Packages (package.json rip):<br/>
                            <ul>
                                <li>"bootstrap": "^5.2.0"</li>
                                <li>"quagga": "^0.12.1"</li>
                                <li>"react": "^18.2.0"</li>
                                <li>"react-dom": "^18.2.0"</li>
                                <li>"react-router-dom": "^6.3.0"</li>
                                <li>"react-scripts": "5.0.1"</li>
                                <li>"reactstrap": "^9.1.2"</li>
                                <li>"web-vitals": "^2.1.4"</li>
                            </ul>
                            Developer: Eithan Kank<br/>
                        </AccordionBody>
                    </AccordionItem>
                </Accordion>
            </div>
    );
};


function Home() {
  return (
    <div className="App">
        <AccordionPage />
    </div>
  );
}

export default Home;
