class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  after_validation -> { 
    if errors.any?
      Log.d errors.map {|error| {error.attribute => error.message}}
    end
  }
end
