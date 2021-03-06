class Api::SessionsController < ApplicationController
  def create
     @user = User.find_by_credentials(
       params[:user][:username],
       params[:user][:password]
     )

     if @user
       login!(@user)
       render :create
     else
       render json: { errors: ["Try again"] }
     end
   end

   def destroy
     logout!
     render json: {}
   end
end
