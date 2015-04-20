module UsersHelper

  def is_admin?
    session[:browserid_email] == ENV['admin'] ? true : false
  end

end
