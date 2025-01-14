import React from 'react'
import classnames from "classnames";
import PropTypes, { any } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import { uploadReport } from "../../actions/reportAction";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

class FormUploadReport extends React.Component {

    constructor() {
        super();
        this.state = {

            // Initially, no file is selected
            selectedFile: null
        };
    }
    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };
    // On file upload (click the upload button)
    onFileUpload = async() => {

        // Create an object of formData
        let formData = new FormData();

        // Update the formData object
         formData.append("file",this.state.selectedFile);
         formData.append("name","this.state.selectedFile.name");
        console.log(formData);
        // Send formData object
        await axios.post("api/report-data", formData,   { headers: { "Content-Type": "multipart/form-data" } });
        // let  dataUpload =  await this.props.uploadReport(formData, this.props.history);
    };
    // onUpdateFile = e => {
    //     e.preventDefault();
    //     const newUser = {
    //         file: this.state.file,
    //     };
       
       
    // };
    // File content to be displayed after
    // file upload is complete
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {this.state.selectedFile.name}</p>


                    <p>File Type: {this.state.selectedFile.type}</p>


                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-report-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add User</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onUpdateFile} id="add-file">
                                    <input type="file" onChange={this.onFileChange} />
                                    <button onClick={this.onFileUpload}>
                                        Upload!
                                    </button>
                                </form>
                                {this.fileData()}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-file"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add User
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

FormUploadReport.propTypes = {
    uploadReport: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { uploadReport }
)(withRouter(FormUploadReport));
