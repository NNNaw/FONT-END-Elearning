import React, { Component } from 'react';
import { connect } from 'react-redux';


class InfoPersonal extends Component {

    renderInfoPersonal = () => {

    }
    renderInfoCourse = () => {

    }
    render() {
        return (
            <div className='info_personal'>
                <div className='bg-dark p-5'></div>
                <div className="info_personal_container container">
                    <div className="row py-5">
                        <div>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                                </li>

                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    {this.renderInfoPersonal()}
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    {this.renderInfoCourse()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
function mapStateToProps(state) {
    return {
        user : state.QuanLyNguoiDungReducer.user
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}
export default connect(
    mapStateToProps,
)(InfoPersonal);