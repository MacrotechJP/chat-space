class Api::MessagesController < ApplicationController
  def index
    @message = Message.all
    respond_to do |format| 
      format.html 
      format.json { @messages = Message.where('id > ?', params[:id]) } 
      
    end
  end
end