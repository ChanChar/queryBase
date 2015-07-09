require 'rails_helper'

feature 'the signup process' do
  scenario 'has a new user form' do
    visit new_user_url
    expect(page).to have_content 'Register'
  end

  feature 'signing up a user' do
    before(:each) do
      visit new_user_url
      fill_in 'username', with: 'thechar'
      fill_in 'email', with: 'thechar@email.com'
      fill_in 'password', with: 'Password123'
      click_on 'Create my account'
    end

    scenario 'redirects and opens modal' do
      expect(page).to have_selector('.joyride-list', visible: true)
      visit('/#')
    end
  end
end
