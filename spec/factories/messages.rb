FactoryBot.define do
  factory :message do
    text {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/uploads/message/image/4/cat1.png")}
    user
    group
  end
end