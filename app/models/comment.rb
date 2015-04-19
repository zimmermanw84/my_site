class Comment < ActiveRecord::Base
  validates :content, :email, presence: true
end
