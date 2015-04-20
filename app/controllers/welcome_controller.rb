class WelcomeController < ApplicationController
  include UsersHelper

  def index
    @comments = Comment.all
  end
end
