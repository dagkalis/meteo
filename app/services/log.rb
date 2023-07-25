class Log

    def self.l(message)
      Rails.logger.debug "-----------------------#{message}------------------"
    end
  
    @@log_counter = 0
    #for debug
  
    def self.d (message)
      begin
        # 3.times {Rails.logger.info "----------"}
        Rails.logger.info "----------"
        # Rails.logger.debug "printer " + "counter " + @@log_counter.to_s
        # @@log_counter += 1
        # Rails.logger.debug ""
  
        printer(message, 0)
        Rails.logger.info "----------"
  
        # 3.times { Rails.logger.info "----------" }
  
  
      rescue => e
        Rails.logger.debug "\n\n\nlogger error\n#{e.message}\n\n"
      end
    end
  
    def self.printer (message, space_count)
      if message.is_a?(ActiveRecord::Base)
        message = message.attributes
      end
  
      if message.respond_to? :to_hash
        message.each do |k, v|
          v = 'nil' if v.nil?
          v = 'empty string' if v == ''
  
          if v.respond_to? :to_hash or v.respond_to? :each
            print_value k.to_s + ": ", space_count
            printer(v, space_count + 1)
          else
            print_value k.to_s + ": " + v.to_s, space_count
          end
        end
  
      elsif message.respond_to? :each
        message.each do |v|
          if v.respond_to? :to_hash or v.respond_to? :each
            Rails.logger.debug ""
            printer(v, space_count + 1)
          else
            v = 'nil' if v.nil?
            v = 'empty string' if v == ''
            print_value v.to_s, space_count
          end
        end
      else
        print_value message ? message.to_s : 'nil', space_count
      end
    end
  
    def self.print_value(value, space_count)
      string = ''
      space_count.times do; string += "\t"; end
      string += value
      Rails.logger.debug string
    end
  end
  
  