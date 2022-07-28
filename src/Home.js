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
                            camera and the North American UPC database, however, 
                            dates and quantities must be manually added. This 
                            Application also eliminates the need to manually 
                            type in TPR data and, instead, converts data into 
                            a well formatted, easy to process, spreadsheet file 
                            that can be easily emailed to the product manager, 
                            saved for future reference, or uploaded to an additional 
                            database for further processing. 
                            
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
