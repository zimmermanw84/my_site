class Comment < ActiveRecord::Base
  belongs_to :user
  validates :content, :email, presence: true
end
