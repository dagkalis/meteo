class Api::V1::ForecastsController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]

  require 'net/http'
  require 'json'

  def index
    api_key = 'your_open_meteo_api_key'
    base_url = 'https://api.open-meteo.com/v1/forecast'

    # Replace these coordinates with the desired location
    raise 'missing latitude or longitude' if !params[:latitude] || !params[:longitude]
    latitude = params[:latitude] # 40.640064
    longitude = params[:longitude] # 22.944420

    # https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41
    # Make the API request
    uri = URI("#{base_url}?latitude=#{latitude}&longitude=#{longitude}&hourly=temperature_2m&timezone=auto")
    Log.d uri
    response = Net::HTTP.get(uri)

    # todo response
    # Log.d response unless response.kind_of? Net::HTTPSuccess

    # Parse the JSON response
    raw_data = JSON.parse(response).deep_transform_keys(&:to_sym)

    # Log.d raw_data

    data = {}
    # Log.d raw_data[:hourly]
    hourly_data = raw_data[:hourly]
    hourly_data[:time].each_with_index do |time, index|
      date = DateTime.parse(hourly_data[:time][index])
      
      data[date.strftime("%d/%m/%Y")] ||= []
      data[date.strftime("%d/%m/%Y")] << {
        hour: date.strftime("%H"),
        temp: hourly_data[:temperature_2m][index],
        # time: hourly_data[:time][index],
        # date: date.strftime("%d/%m/%Y"),
        # rain: hourly_data[:rain][index],
        # showers: hourly_data[:showers][index],
        # cloudcover: hourly_data[:cloudcover][index],

       }
    end

    render json: data
  end
end
