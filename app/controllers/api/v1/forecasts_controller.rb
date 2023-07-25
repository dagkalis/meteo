class Api::V1::ForecastsController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]

  require 'net/http'
  require 'json'

  def index
    api_key = 'your_open_meteo_api_key'
    base_url = 'https://api.open-meteo.com/v1/forecast'

    # Replace these coordinates with the desired location
    latitude = 40.640064
    longitude = 22.944420

    # https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41
    # Make the API request
    uri = URI("#{base_url}?latitude=#{latitude}&longitude=#{longitude}&hourly=temperature_2m,rain,showers,cloudcover")
    response = Net::HTTP.get(uri)

    # Parse the JSON response
    raw_data = JSON.parse(response).deep_transform_keys(&:to_sym)

    # Log.d raw_data

    data = []
    # Log.d raw_data[:hourly]
    hourly_data = raw_data[:hourly]
    hourly_data[:time].each_with_index do |time, index|
      # date = DateTime.strptime(hourly_data[:time][index], '%m/%d/%Y %I:%M %p')
      # Log.d({
      #   raw: hourly_data[:time][index], 
      #   parsed: DateTime.iso8601(hourly_data[:time][index]).to_time
      # })
      date = DateTime.parse(hourly_data[:time][index])

      data << {
        time: hourly_data[:time][index],
        date: date.strftime("%d/%m/%Y"),
        hour: date.strftime("%H"),
        temperature: hourly_data[:temperature_2m][index],
        rain: hourly_data[:rain][index],
        showers: hourly_data[:showers][index],
        cloudcover: hourly_data[:cloudcover][index],

       }
    end
    
    render json: data
  end
end
