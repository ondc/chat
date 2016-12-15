/**
 * Created by Jerry on 16/12/12.
 */

import React from "react";

import Avatar from "../avatar";

import { connect } from "react-redux";
@connect( state => ({
    user: state.user,
    messageList : state.messageList,
    currentChatUser: state.currentChatUser }))
export default class MessageList extends React.Component{

    render(){

        const List = this.props.messageList[this.props.currentChatUser._id] || [];

        return <div ref={ node => this._listNode = node } className="dialogue flex">
            <div className="dialogue-middle">
                {
                    List.map( (val, index) => <_Message key={index * 2} message={ val } myId={ this.props.user._id }/>)
                }
            </div>
        </div>
    }

    toBottom(){
        //渲染完毕后 将滚动条拉倒最底部
        this._listNode.scrollTop = this._listNode.scrollHeight;
    }
    componentDidMount(){
        this.toBottom();
    }

    componentDidUpdate(){
        this.toBottom();
    }
}

/**
 * 单条消息
 */
class _Message extends React.Component{

    render(){

        const { message, myId } = this.props;

        return <div className={`dialogue-${message.from === myId ? "right" : "left"} flex`}>

            <Avatar avatar="https://d13yacurqjgara.cloudfront.net/users/623359/avatars/mini/9f913570d43869d5d3efb89ac684093b.png?1442219999"/>

            <span className="arrow" />
            <div className="content flex">
                <span>{ message.content }</span>
            </div>
        </div>
    }
}