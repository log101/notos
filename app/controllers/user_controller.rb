include SecureRandom

# Kullanıcı adı da oda numarasında olduğu gibi ortam değişkeninde tutuluyor
class UserController < ApplicationController
  # Kullanıcı adını sun
  def get
    @user = User.find_by(name: session[:user_id])
    if @user
      render json: {
        user_id: @user.name
      }
    else
      session[:user_id] = SecureRandom.base36
      @room = Room.find_by(name: session[:room_id])
      @new_user = User.new(name: session[:user_id], room_id: @room.id)
      @new_user.save!
      render json: {
        user_id: session[:user_id]
      }
    end
  end

  # Kullanıcı adını değiştir
  def set
    if params[:user_id]
      user = User.find_by!(name: session[:user_id])
      if user.update(name: params[:user_id])
        session[:user_id] = params[:user_id]
        render json: {
          alert: "Username successfully changed!",
          user_id: session[:user_id]
        }
      else
        render json: {
          alert: "Error while changing username",
          user_id: session[:user_id]
        }
      end
    end
  end
end